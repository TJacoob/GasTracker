<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="loginForm" @submit.prevent="login">
							<div class="form-group" v-on:click="scroll">
								<input v-model="username"
									   type="text"
									   class="form-control "
									   :class="{'has-error':this.$v.username.$invalid && this.submitted}"
									   id="inputUsername"
									   placeholder="Username ou Email"
								>
							</div>
							<div class="form-group">
								<input v-model="password"
									   type="password"
									   class="form-control "
									   :class="{'has-error':this.$v.password.$invalid && this.submitted}"
									   id="inputPassword"
									   placeholder="Password"
								>
							</div>
							<div class="alert alert-danger" role="alert" v-if="this.error!==null">
								{{error}}
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
							<div class="btn-main" @click="login">
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
    import { required } from 'vuelidate/lib/validators';
    const qs = require('querystring');


    export default {
        name: "login",
		middleware: 'auth',
        components: { BaseLayout },
		methods:{
          	scroll(){
                this.$nextTick(() => {
                    this.$refs.loginForm.scrollLeft = 0;
                });
			},
			login(){
          	    this.error = null;
          	    if (this.$v.$invalid)
          	        this.submitted=true;
          	    else{
                    let user = {
                        login: this.username,
                        password: this.password,
                    };
                    this.$auth.loginWith('local',{
                        data: qs.stringify(user),
                    })
					.then((res) => {
						this.$router.push({name:'dashboard'});
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
				}

			}

		},
        data(){
            return {
                // Form Data
                username:'',
                password:'',
                // Form Controllers
                submitted: false,
                error: null,
            }
        },
        validations: {
            username: {
                required,
            },
            password: {
                required,
            }
        }
    }

</script>

<style scoped>

</style>
