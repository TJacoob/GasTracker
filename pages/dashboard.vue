<template>
	<div>
		<p>Dashboard</p>
		<p v-if="$auth.loggedIn">Hello {{$auth.user.username}}!</p>
		<p v-else>Hello stranger</p>

		<div @click="$auth.logout()">Logout</div>
	</div>
</template>

<script>

    export default {
        name: "dashboard",
        middleware: 'auth',
    }
</script>

<style scoped>

</style>
