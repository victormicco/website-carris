/* * */

import { getPublicVariable } from '@carrismetropolitana/website-settings';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { Media } from '@/schemas/Media/collection';
import { News } from '@/schemas/News/collection';
import { Topics } from '@/schemas/Topics/collection';
import { Users } from '@/schemas/Users/collection';

/* * */

export default buildConfig({

	// Only admins can access the CMS
	admin: {
		user: 'users',
	},

	// Define and configure your collections in this array
	collections: [
		Media,
		News,
		Topics,
		Users,
	],

	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: process.env.WEBSITEDB_URI || 'mongodb://placeholder:placeholder@placeholder:12345/placeholder',
	}),

	// If you'd like to use Rich Text,
	// pass your editor here.
	editor: lexicalEditor(),

	// If you'd like to send emails from Payload,
	// pass your email configuration here.
	email: nodemailerAdapter({
		defaultFromAddress: process.env.EMAIL_FROM_ADDRESS ?? '',
		defaultFromName: process.env.EMAIL_FROM_NAME ?? '',
		skipVerify: true,
		transportOptions: {
			auth: {
				pass: process.env.EMAIL_SERVER_PASSWORD,
				user: process.env.EMAIL_SERVER_USER,
			},
			host: process.env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
		},
	}),

	// Define and configure your globals in this array
	globals: [
		// LegalDocuments,
		// SocialBodies,
	],

	// If you'd like to use S3 for file uploads,
	// pass your S3 configuration here.
	plugins: [
		s3Storage({
			bucket: process.env.CLOUDFLARE_R2_BUCKET ?? 'placeholder',
			collections: {
				// 'documents': true,
				// 'internal-documents': true,
				media: true,
				// 'video-files': true,
			},
			config: {
				bucketEndpoint: true,
				credentials: {
					accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? 'placeholder',
					secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? 'placeholder',
				},
				region: 'auto',
			},
		}),
	],

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || 'placeholder',

	// The URL where Payload is hosted
	serverURL: getPublicVariable('backoffice_url'),

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!

	sharp,

});
