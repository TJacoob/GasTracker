<template>
	<ShortLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="vehicleAddForm" @submit.prevent="submit">
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
							<div class="form-group mt-4">
								<div class="row text-center">
									<div class="col-4">
										<div class="btn-option"
											 @click="selectFuel('Gasóleo')"
											 :class="{'active':this.fuel==='Gasóleo'}"
										>
											<font-awesome-icon icon="gas-pump" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Gasóleo</span>
									</div>
									<div class="col-4">
										<div class="btn-option"
											 @click="selectFuel('Gasolina 98')"
											 :class="{'active':this.fuel==='Gasolina 98'}"
										>
											<font-awesome-icon icon="gas-pump" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Gasolina 98</span>
									</div>
									<div class="col-4">
										<div class="btn-option"
											 @click="selectFuel('Gasolina 95')"
											 :class="{'active':this.fuel==='Gasolina 95'}"
										>
											<font-awesome-icon icon="gas-pump" class="btn-icon"/>
										</div>
										<span class="text-overflow-center">Gasolina 95</span>
									</div>
									<div class="col-12 mt-2">
										<small class="error-message"
											   v-if="!this.$v.fuel.required && this.submitted">
											Escolha um Combustível
										</small>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</ShortLayout>
</template>

<script>
    import ShortLayout from "../../layout/short";
    import {helpers, maxLength, between, required, numeric} from "vuelidate/lib/validators";
    const qs = require('querystring');

    const licensePlatePT = helpers.regex('alpha', /^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/i)

    export default {
        name: "add",
        middleware: 'auth',
        components: { ShortLayout },
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
                    let vehicle = {
                        license:this.license,
                        name:this.name,
                        brand:this.brand,
                        model:this.model,
                        year:this.year,
                        kilometers:this.kilometers,
                        fuel:this.fuel,
                    };
                    this.$axios.post('/api/vehicles/add',
                        qs.stringify(vehicle),
                        {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
					.then(res => {
                        this.$router.push({name:'vehicles'});
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
                }
            },
			selectFuel(fuel){
                this.fuel = fuel;
			},
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
			fuel: {
                required,
			}
        }
    }
</script>

<style scoped>

</style>
