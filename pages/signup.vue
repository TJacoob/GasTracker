<template>
	<BaseLayout>
		<div slot="content" class="content-position my-auto">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="signupForm" @submit.prevent="register">
							<div class="form-group" v-on:click="scroll">
								<input v-model="username"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.username.$invalid && this.submitted}"
									   id="inputUsername"
									   placeholder="Username"
								>
								<small class="error-message"
									   v-if="!this.$v.username.minLength && this.submitted">
									Deve ter pelos menos 4 caracteres
								</small>
								<small class="error-message"
									   v-if="!this.$v.username.maxLength && this.submitted">
									Deve ter menos de 128 caracteres
								</small>
							</div>
							<div class="form-group">
								<input v-model="email"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.email.$invalid && this.submitted}"
									   id="inputEmail"
									   placeholder="Email"
								>
								<small class="error-message"
									   v-if="!this.$v.email.email && this.submitted">
									Deve ser um email válido
								</small>
							</div>
							<div class="form-group">
								<input v-model="password"
									   type="password"
									   class="form-control"
									   :class="{'has-error':this.$v.password.$invalid && this.submitted}"
									   id="inputPassword"
									   placeholder="Password"
								>
								<small class="error-message"
									   v-if="!this.$v.password.minLength && this.submitted">
									Deve ter pelos menos 6 caracteres
								</small>
								<small class="error-message"
									   v-if="!this.$v.password.maxLength && this.submitted">
									Deve ter menos de 128 caracteres
								</small>
							</div>
							<div class="form-group">
								<input v-model="password_confirm"
									   type="password"
									   class="form-control"
									   :class="{'has-error':this.$v.password_confirm.$invalid && this.submitted}"
									   id="inputPasswordConfirm"
									   placeholder="Password (novamente)"
								>
								<small class="error-message"
									   v-if="!this.$v.password_confirm.sameAs && this.submitted">
									Passwords devem ser iguais
								</small>
							</div>
							<div class="alert alert-danger" role="alert" v-if="this.error!==null">
								{{error}}
							</div>
						</form>
						<span class="f-gray lh-sm">
							<small>Se já usaste este website antes, <a href="/login" class="text-link">faz antes login</a>.</small>
						</span>
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
								<span>Criar Conta</span>
							</div>
							<span class="f-gray lh-sm">
								<small>Ao utilizar este website concorda com os <a href="/legal/termos-e-condicoes" class="text-link">Termos e Condições</a> e a <a href="/legal/privacidade-e-cookies" class="text-link">Política de Privacidade.</a></small>
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
    import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators';
    const qs = require('querystring');

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
            register(){
                if (this.$v.$invalid)
                    this.submitted=true;
                else {
                    let user = {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        password_confirm: this.password_confirm,
                    };
                    this.$axios.post('/api/users/create',
                        qs.stringify(user),
                        {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
					.then(res => {
						this.$auth.loginWith('local',{
							data: qs.stringify({login:user.username, password:user.password}),
						})
						.then((res) => {
                            const token = this.$auth.getToken('local');
                            this.$axios.setHeader('x-access-token', token);
							this.$router.push({name:'dashboard'});
						})
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
				email:'',
				password:'',
				password_confirm:'',
				// Form Controllers
                submitted: false,
				error: null,
			}
        },
        validations: {
            username: {
                required,
				minLength: minLength(4),
				maxLength: maxLength(128),
            },
            email: {
                required,
				email,
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(128),
            },
            password_confirm: {
                required,
                sameAs: sameAs('password'),
            }
        }
    }

</script>

<style scoped>

</style>
