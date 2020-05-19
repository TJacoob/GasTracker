<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<div class="row small-gutters mb-3">
							<div class="col-auto">
								<font-awesome-icon icon="user" class="btn-icon fa-2x"/>
							</div>
							<div class="col align-self-center">
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
						<div class="row small-gutters mb-3" v-if="age!==null || this.editing">
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
						<div class="row small-gutters" v-if="this.dataUpdated">
							<div class="col-12">
								<div class="alert alert-success" role="alert">
									Dados Atualizados com Sucesso
								</div>
							</div>
						</div>
					</div>
				</div>
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
								<div class="btn-main btn-cancel mx-auto" @click="cancel">
									<span>Cancelar</span>
								</div>
							</div>
						</div>
						<div class="row mt-5 justify-content-end text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/dashboard">
									<div class="btn-square">
										<font-awesome-icon icon="home" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Homepage</span>
								</nuxt-link>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 " @click="$auth.logout()">
								<div class="btn-square">
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
    import { required, integer } from 'vuelidate/lib/validators';
    const qs = require('querystring');

    export default {
        name: "profile",
        middleware: 'auth',
        components: { BaseLayout },
        data(){
            return {
                // Form Data
                name:this.name,
                age:this.age,
                // Form Controllers
                submitted: false,
                error: null,
				editing:false,
				dataUpdated: false,
            }
        },
        mounted () {
            this.$axios.get('/api/profiles/own')
			.then(res => {
				this.name = res.data.profile.name;
				this.age = res.data.profile.age;
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
                    const data = {name:this.name, age:this.age}
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
					this.age = res.data.profile.age;
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
            age: {
                integer,
            }
        }
    }
</script>

<style scoped>

</style>
