/* * */

export const publicApiRoute = async (req) => {
	return Response.json(
		{
			message: `Hello ${req.routeParams.name as string} @ ${req.routeParams.group as string}`,
		},
		{
			headers: { 'Access-Control-Allow-Origin': '*' },
		},
	);
};
