<template>
	<div>
		<p>Dashboard</p>
		<p v-if="loggedIn">Hello Registered User!</p>
		<p v-else>Hello stranger</p>

	</div>
</template>

<script>

    export default {
        name: "dashboard",
        computed: {
            loggedIn(){
                console.log(this.$store.getters.loggedIn);
                return this.$store.getters.loggedIn;
			}
        }
    }
</script>

<style scoped>

</style>
