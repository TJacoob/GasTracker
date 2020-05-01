export default function ({store, app: { $axios }}) {
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
        'post'
    ]);

    const token = store.state.auth.user.token;
    $axios.setHeader('x-access-token', token);

    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })


}
