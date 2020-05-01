<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="signupForm" @submit.prevent="submit">
							<div class="form-group">
								<input v-model="license"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.license.$invalid && this.submitted}"
									   id="inputLicense"
									   placeholder="Matricula"
								>
								<small class="error-message"
									   v-if="!this.$v.license.licensePlatePT && this.submitted">
									Formato de Matrícula Inválido
								</small>
							</div>
							<div class="form-group">
								<input v-model="name"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.name.$invalid && this.submitted}"
									   id="inputName"
									   placeholder="Alcunha"
								>
								<small class="error-message"
									   v-if="!this.$v.name.maxLength && this.submitted">
									Use menos de 64 caracteres
								</small>
							</div>
							<div class="form-group">
								<input v-model="brand"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.brand.$invalid && this.submitted}"
									   id="inputBrand"
									   placeholder="Marca"
								>
								<small class="error-message"
									   v-if="!this.$v.brand.maxLength && this.submitted">
									Use menos de 128 caracteres
								</small>
							</div>
							<div class="form-group">
								<input v-model="model"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.model.$invalid && this.submitted}"
									   id="inputModel"
									   placeholder="Modelo"
								>
								<small class="error-message"
									   v-if="!this.$v.model.maxLength && this.submitted">
									Use menos de 128 caracteres
								</small>
							</div>
							<div class="form-group">
								<input v-model="year"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.year.$invalid && this.submitted}"
									   id="inputYear"
									   placeholder="Ano"
								>
								<small class="error-message"
									   v-if="!this.$v.year.numeric && this.submitted">
									Insira um Ano
								</small>
								<small class="error-message"
									   v-if="!this.$v.year.between && this.submitted && this.$v.year.numeric">
									Insira um ano posterior a 1900 e menor que o atual
								</small>
							</div>
							<div class="form-group">
								<input v-model="kilometers"
									   type="text"
									   class="form-control"
									   :class="{'has-error':this.$v.kilometers.$invalid && this.submitted}"
									   id="inputKilometers"
									   placeholder="Kilometros (atuais)"
								>
								<small class="error-message"
									   v-if="!this.$v.kilometers.numeric && this.submitted">
									Insira um número
								</small>
								<small class="error-message"
									   v-if="!this.$v.kilometers.between && this.submitted && this.$v.kilometers.numeric">
									Insira um número maior que 0
								</small>

							</div>
							<div class="form-group">
								<div class="row text-center">
									<div class="col-4">
										<div class="btn-square">
											<font-awesome-icon icon="gas-pump" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Gasóleo</span>
									</div>
									<div class="col-4">
										<div class="btn-square">
											<font-awesome-icon icon="gas-pump" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Gasolina 98</span>
									</div>
									<div class="col-4">
										<div class="btn-square">
											<font-awesome-icon icon="gas-pump" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Gasolina 95</span>
									</div>
								</div>
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
							<div class="btn-main" @click="submit">
								<span>Adicionar</span>
							</div>
							<div class="row mt-5 justify-content-center text-center">
								<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
									<nuxt-link to="/vehicles">
										<div class="btn-square">
											<font-awesome-icon icon="reply" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Voltar</span>
									</nuxt-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script>
	// TODO: Add Scroll, validate fuel param, finish form

    import BaseLayout from "../../layout/default";
    import {helpers, maxLength, between, required, numeric} from "vuelidate/lib/validators";
    const qs = require('querystring');

    const licensePlatePT = helpers.regex('alpha', /^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/i)

    export default {
        name: "add",
        middleware: 'auth',
        components: { BaseLayout },
        data(){
            return {
                // Form Data
                license:'',
                name:'',
                brand:'',
                model:'',
                year:'',
                kilometers:'',
                fuel:'',
                // Form Controllers
                submitted: false,
                error: null,
            }
        },
		methods:{
            submit(){
                if (this.$v.$invalid)
                    this.submitted=true;
                else {
                    console.log("here");
                    let vehicle = {

                    };
                    this.$axios.post('/api/users/create',
                        qs.stringify(vehicle),
                        {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
					.then(res => {
						console.log(res);
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
                }
            }
		},
        validations: {
            license: {
                required,
                licensePlatePT,
            },
            name: {
                required,
                maxLength: maxLength(64),
            },
            brand: {
                required,
                maxLength: maxLength(128),
            },
            model: {
                required,
                maxLength: maxLength(128),
            },
            year: {
                required,
                numeric,
				between: between(1900, new Date().getFullYear()),
            },
            kilometers: {
                required,
                numeric,
                between: between(0, 2000000),
            },
        }
    }
</script>

<style scoped>

</style>
