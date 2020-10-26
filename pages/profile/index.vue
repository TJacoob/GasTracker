<template>
	<BaseLayout>
		<div slot="content" class="content-position mt-auto my-sm-auto">
			<div class="container-fluid">
				<transition name="fade">
					<div v-show="!loaded" class="loading-screen">
						<div class="my-auto">
							<font-awesome-icon icon="circle-notch" class="fa-4x f-secondary fa-spin"/>
						</div>
					</div>
				</transition>
				<transition name="fade">
					<div v-show="loaded" class="row justify-content-center">
						<div class="col-12 col-sm-12 col-md-6 col-lg-4">
							<div class="row mb-3">
								<div class="col-auto">
									<font-awesome-icon icon="user" class="btn-icon fa-2x fa-fw"/>
								</div>
								<div class="col pl-0 align-self-center">
									<div class="form-group mb-0 my-auto">
										<input v-model="name"
											   v-if="this.editing"
											   type="text"
											   class="form-control "
											   :class="{ 'has-error':this.$v.name.$invalid && this.submitted }"
											   id="inputName"
											   placeholder="Name"
										>
										<span v-else>{{name}}</span>
									</div>
								</div>
							</div>
							<!--
							<div class="row mb-3" v-if="age!==null || this.editing">
								<div class="col-auto">
									<font-awesome-icon icon="user" class="btn-icon fa-2x"/>
								</div>
								<div class="col">
									<div class="form-group mb-0">
										<input v-model="age"
											   v-if="this.editing"
											   type="text"
											   class="form-control"
											   :class="{'has-error':this.$v.age.$invalid && this.submitted}"
											   id="inputAge"
											   placeholder="Age"
										>
										<span v-else>{{age}}</span>
									</div>
								</div>
							</div>
							<div class="row mb-3" v-if="email!==undefined  || this.editing">
								<div class="col-auto">
									<font-awesome-icon icon="envelope" class="btn-icon fa-2x fa-fw"/>
								</div>
								<div class="col pl-0 align-self-center">
									<div class="form-group mb-0 my-auto">
										<input v-model="email"
											   v-if="this.editing"
											   type="text"
											   class="form-control"
											   :class="{'has-error':this.$v.email.$invalid && this.submitted}"
											   id="inputEmail"
											   placeholder="Email"
										>
										<span v-else>{{email}}</span>
									</div>
								</div>
							</div>
							-->
							<div class="row small-gutters" v-if="this.dataUpdated">
								<div class="col-12">
									<div class="alert alert-success" role="alert">
										Dados Atualizados com Sucesso
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<div class="btn-main" @click="edit" v-if="!this.editing">
								<span>Alterar</span>
							</div>
							<div class="text-center" v-else>
								<div class="btn-main mb-4" @click="submit">
									<span>Guardar</span>
								</div>
							</div>
						</div>
						<div class="row mt-5 justify-content-end text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4" v-if="this.editing">
								<div class="btn-square mx-auto" @click="cancel">
									<font-awesome-icon icon="times" class="btn-icon"/>
								</div>
								<span class="text-overflow-center">Cancelar</span>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4" v-if="!this.editing">
								<nuxt-link to="/help">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="question" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Ajuda</span>
								</nuxt-link>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/dashboard">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="home" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Homepage</span>
								</nuxt-link>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 " @click="$auth.logout()">
								<div class="btn-square mx-auto">
									<font-awesome-icon icon="sign-out-alt" class="btn-icon"/>
								</div>
								<span class="text-overflow-center">Logout</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script>
    import BaseLayout from "../../layout/default";
    import { required, integer, email } from 'vuelidate/lib/validators';
    const qs = require('querystring');

    export default {
        name: "profile",
        middleware: 'auth',
        components: { BaseLayout },
        data(){
            return {
                // Form Data
                name:this.name,
                //age:this.age,
				//email:this.email,
                // Form Controllers
                submitted: false,
                error: null,
				editing:false,
				dataUpdated: false,
				loaded: false,
            }
        },
        mounted () {
            this.$axios.get('/api/profiles/own')
			.then(res => {
				this.name = res.data.profile.name;
				//this.age = res.data.profile.age;
				//this.email = res.data.profile.email;
				this.loaded = true;
			})
			.catch(error => {
				this.error = error.response.data.error;
			})
        },
        methods: {
            edit() {
                this.editing = true;
			},
            submit() {
                this.error = null;
                if (this.$v.$invalid)
                    this.submitted=true;
                else {
                    const data = {
                    	name:this.name,
                    	//age:this.age,
						//email:this.email
                    }
                    this.$axios.post('/api/profiles/edit',
                        qs.stringify(data),
                        {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
					.then(res => {
						//console.log(res);
                        this.editing = false;
                        this.dataUpdated = true;
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
				}
            },
			cancel(){
                this.$axios.get('/api/profiles/own')
				.then(res => {
					this.name = res.data.profile.name;
					//this.age = res.data.profile.age;
					//this.email = res.data.profile.email;
					this.editing = false;
				})
				.catch(error => {
					this.error = error.response.data.error;
				})
			},
        },
        validations: {
            name: {
                required,
            },
			/*
            age: {
                integer,
            },
			email: {
				email,
			}
			*/
        }
    }
</script>

<style scoped>

</style>
