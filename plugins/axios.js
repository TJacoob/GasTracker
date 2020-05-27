export default function ({store, app: { $axios }}) {
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
        'post'
    ]);

    const user = store.state.auth.user;
    if ( user )
    {
        const token = user.token;
        if ( token )
            $axios.setHeader('x-access-token', token);
    }

    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

	$axios.onError(error => {
		console.log(error);
	})


}
