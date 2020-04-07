<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="loginForm">
							<div class="form-group" v-on:click="scroll">
								<input v-model="username" type="text" class="form-control" id="inputUsername" placeholder="Username">
							</div>
							<div class="form-group">
								<input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<div class="btn-main">
								<span>Entrar</span>
							</div>
							<span class="f-gray lh-sm">
								<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis deleniti enim necessitatibus nostrum officia officiis repellendus voluptate? Autem eum illo labore molestiae mollitia sit unde voluptas? Impedit iure reiciendis ullam!</small>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script>
    import BaseLayout from '../layout/default';

    export default {
        name: "login",
        components: { BaseLayout },
		methods:{
          	scroll(){
          	    //console.log(e.target);
                this.$nextTick(() => {
                    this.$refs.loginForm.scrollLeft = 0;
                });

			},
		},
    }

</script>

<style scoped>

</style>
