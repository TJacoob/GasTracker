<template>
	<div>
		<p>Dashboard</p>
		<p v-if="$auth.loggedIn">Hello {{$auth.user.username}}!</p>
		<p v-else>Hello stranger</p>

	</div>
</template>

<script>

    export default {
        name: "dashboard",

    }
</script>

<style scoped>

</style>
