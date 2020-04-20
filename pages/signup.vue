<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="signupForm" @submit.prevent="register">
							<div class="form-group" v-on:click="scroll">
								<input v-model="username" type="text" class="form-control" id="inputUsername" placeholder="Username">
							</div>
							<div class="form-group">
								<input v-model="email" type="text" class="form-control" id="inputEmail" placeholder="Email">
							</div>
							<div class="form-group">
								<input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
							</div>
							<div class="form-group">
								<input v-model="password_confirm" type="password" class="form-control" id="inputPasswordConfirm" placeholder="Password (Again)">
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
							<div class="btn-main" @click="register">
								<span>Signup</span>
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
        name: "signup",
        components: { BaseLayout },
        methods:{
            scroll(){
                //console.log(e.target);
                this.$nextTick(() => {
                    this.$refs.signupForm.scrollLeft = 0;
                });
            },
			register() {
              	this.$store.dispatch('register',{
              	    username: this.username,
					email:this.email,
					password:this.password,
					password_confirm:this.password_confirm,
				})
				.then(()=>{
				    this.$router.push({ name:'dashboard'});
				})
			},
        },
        data(){
			return {
			 	username:'',
				email:'',
				password:'',
				password_confirm:'',
			}
        },
    }

</script>

<style scoped>

</style>
