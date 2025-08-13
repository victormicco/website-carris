'use client';

import type { AllPinsProps } from './AllPins';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AllPins } from './AllPins';

export interface DraggableAllPinsProps extends AllPinsProps {
	bounds?: {
		maxX?: number
		maxY?: number
		minX?: number
		minY?: number
	}
	enableDoubleClickReset?: boolean
	onDragMove?: (offset: { x: number, y: number }) => void
}

export function DraggableAllPins({ bounds, enableDoubleClickReset = true, onDragMove, style, ...props }: DraggableAllPinsProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [zoomStart, setZoomStart] = useState(1);
	const [isMouseInside, setIsMouseInside] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 3;

	const calculateZoomBounds = useCallback(() => {
		if (!containerRef.current) return { minX: -100, maxX: 100, minY: -100, maxY: 100 };
		
		const container = containerRef.current;
		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;
		
		// SVG viewBox dimensions
		const svgViewBoxWidth = 1798;
		const svgViewBoxHeight = 1312;
		const svgAspectRatio = svgViewBoxWidth / svgViewBoxHeight;
		const containerAspectRatio = containerWidth / containerHeight;
		
		// Calculate rendered dimensions with preserveAspectRatio="xMidYMid slice"
		// This mode scales to fill the container completely, cropping if necessary
		let renderedWidth, renderedHeight;
		let croppedWidth = 0, croppedHeight = 0;
		
		if (containerAspectRatio > svgAspectRatio) {
			// Container is wider than SVG - SVG width fills container, height extends beyond
			renderedWidth = containerWidth;
			renderedHeight = renderedWidth / svgAspectRatio;
			// Height is cropped (extends beyond container)
			croppedHeight = renderedHeight - containerHeight;
		} else {
			// Container is taller than SVG - SVG height fills container, width extends beyond
			renderedHeight = containerHeight;
			renderedWidth = renderedHeight * svgAspectRatio;
			// Width is cropped (extends beyond container)
			croppedWidth = renderedWidth - containerWidth;
		}
		
		// Apply zoom to rendered dimensions
		const zoomedWidth = renderedWidth * zoom;
		const zoomedHeight = renderedHeight * zoom;
		const zoomedCroppedWidth = croppedWidth * zoom;
		const zoomedCroppedHeight = croppedHeight * zoom;
		
		// Calculate movement bounds
		// At zoom = 1, we need to access the cropped areas
		// At higher zooms, we need additional movement for the scaled content
		const extraWidth = Math.max(0, zoomedWidth - containerWidth);
		const extraHeight = Math.max(0, zoomedHeight - containerHeight);
		
		return {
			minX: -extraWidth / 2,
			maxX: extraWidth / 2,
			minY: -extraHeight / 2,
			maxY: extraHeight / 2,
		};
	}, [zoom]);

	const constrainOffset = useCallback((newOffset: { x: number, y: number }) => {
		const zoomBounds = calculateZoomBounds();
		
		return {
			x: Math.max(
				zoomBounds.minX,
				Math.min(zoomBounds.maxX, newOffset.x),
			),
			y: Math.max(
				zoomBounds.minY,
				Math.min(zoomBounds.maxY, newOffset.y),
			),
		};
	}, [calculateZoomBounds]);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		setIsDragging(true);
		setDragStart({
			x: e.clientX - offset.x,
			y: e.clientY - offset.y,
		});
		e.preventDefault();
	}, [offset]);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (!isDragging) return;

		const newOffset = constrainOffset({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		});

		setOffset(newOffset);
		onDragMove?.(newOffset);
	}, [isDragging, dragStart, onDragMove, constrainOffset]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleMouseEnter = useCallback(() => {
		setIsMouseInside(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsMouseInside(false);
		setIsDragging(false);
	}, []);

	const handleWheel = useCallback((e: React.WheelEvent) => {
		e.preventDefault();
		e.stopPropagation();
		
		const delta = e.deltaY > 0 ? 0.9 : 1.1;
		const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * delta));
		
		if (newZoom !== zoom) {
			setZoom(newZoom);
			
			// Adjust offset to keep the point under cursor in the same position
			const rect = containerRef.current?.getBoundingClientRect();
			if (rect) {
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;
				
				const scaleChange = newZoom / zoom;
				const newOffset = {
					x: mouseX - (mouseX - offset.x) * scaleChange,
					y: mouseY - (mouseY - offset.y) * scaleChange,
				};
				
				const constrainedOffset = constrainOffset(newOffset);
				setOffset(constrainedOffset);
				onDragMove?.(constrainedOffset);
			}
		}
	}, [zoom, offset, onDragMove, constrainOffset]);

	// Touch events for mobile support
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		if (e.touches.length === 1) {
			const touch = e.touches[0];
			setIsDragging(true);
			setDragStart({
				x: touch.clientX - offset.x,
				y: touch.clientY - offset.y,
			});
		} else if (e.touches.length === 2) {
			// Start pinch-to-zoom
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) +
				Math.pow(touch2.clientY - touch1.clientY, 2)
			);
			setZoomStart(zoom);
		}
		e.preventDefault();
	}, [offset, zoom]);

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		if (e.touches.length === 1 && isDragging) {
			const touch = e.touches[0];
			const newOffset = constrainOffset({
				x: touch.clientX - dragStart.x,
				y: touch.clientY - dragStart.y,
			});

			setOffset(newOffset);
			onDragMove?.(newOffset);
		} else if (e.touches.length === 2) {
			// Handle pinch-to-zoom
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) +
				Math.pow(touch2.clientY - touch1.clientY, 2)
			);
			
			// Calculate zoom based on distance change
			const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomStart * (distance / 100)));
			setZoom(newZoom);
		}
		e.preventDefault();
	}, [isDragging, dragStart, onDragMove, constrainOffset, zoomStart]);

	const handleTouchEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleDoubleClick = useCallback(() => {
		if (enableDoubleClickReset) {
			setOffset({ x: 0, y: 0 });
			setZoom(1);
			onDragMove?.({ x: 0, y: 0 });
		}
	}, [enableDoubleClickReset, onDragMove]);

	// Global wheel event listener to prevent page scrolling when mouse is over the map
	useEffect(() => {
		const handleGlobalWheel = (e: WheelEvent) => {
			if (isMouseInside) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Add passive: false to ensure preventDefault works
		document.addEventListener('wheel', handleGlobalWheel, { passive: false });
		
		return () => {
			document.removeEventListener('wheel', handleGlobalWheel);
		};
	}, [isMouseInside]);

	const wrapperStyle: React.CSSProperties = {
		cursor: isDragging ? 'grabbing' : 'grab',
		height: '100%',
		overflow: 'hidden',
		position: 'relative',
		touchAction: 'none',
		userSelect: 'none',
		width: '100%',
		backgroundColor: '#A6D4FF',
		overscrollBehavior: 'contain',
		...style,
	};

	const imageStyle: React.CSSProperties = {
		position: 'absolute',
		width: '170%',
		height: '170%',
		left: '-35%',
		top: '-40%',
		transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
		transformOrigin: 'center center',
		transition: isDragging ? 'none' : 'transform 0.2s ease-out',
		display: 'block',
	};

	return (
		<div
			ref={containerRef}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onWheel={handleWheel}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			style={wrapperStyle}
		>
			<AllPins {...props} style={imageStyle} />
			
			{/* Zoom Controls */}
			<div style={{
				position: 'absolute',
				top: '10px',
				right: '10px',
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				zIndex: 10,
			}}>
				<button
					onClick={() => {
						const newZoom = Math.min(MAX_ZOOM, zoom * 1.2);
						setZoom(newZoom);
					}}
					style={{
						width: '32px',
						height: '32px',
						border: 'none',
						borderRadius: '4px',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						color: '#333',
						fontSize: '18px',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					title="Zoom In"
				>
					+
				</button>
				<button
					onClick={() => {
						const newZoom = Math.max(MIN_ZOOM, zoom * 0.8);
						setZoom(newZoom);
					}}
					style={{
						width: '32px',
						height: '32px',
						border: 'none',
						borderRadius: '4px',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						color: '#333',
						fontSize: '18px',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					title="Zoom Out"
				>
					−
				</button>
				<button
					onClick={handleDoubleClick}
					style={{
						width: '32px',
						height: '32px',
						border: 'none',
						borderRadius: '4px',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						color: '#333',
						fontSize: '12px',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					title="Reset View"
				>
					⌂
				</button>
			</div>
			
			{/* Zoom Level Indicator */}
			<div style={{
				position: 'absolute',
				bottom: '10px',
				right: '10px',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				color: 'white',
				padding: '4px 8px',
				borderRadius: '4px',
				fontSize: '12px',
				zIndex: 10,
			}}>
				{Math.round(zoom * 100)}%
			</div>
		</div>
	);
}
