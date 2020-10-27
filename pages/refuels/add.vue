<template>
	<ShortLayout>
		<div slot="content" class="content-position mt-auto my-sm-auto">
			<div class="container-fluid">
				<transition name="fade">
					<div v-show="sending" class="loading-screen">
						<div class="my-auto">
							<font-awesome-icon icon="circle-notch" class="fa-4x f-secondary fa-spin"/>
						</div>
					</div>
				</transition>
				<transition name="fade">
					<div v-show="!sending" class="row justify-content-center">
						<div class="col-12 col-sm-12 col-md-6 col-lg-4">
							<form v-show="!showBrands" ref="refuelAddForm" @submit.prevent="submit">
								<div class="form-group">
									<input v-model="quantity"
										   type="text"
										   class="form-control"
										   :class="{'has-error':this.$v.quantity.$invalid && this.submitted}"
										   id="inputQuantity"
										   placeholder="Litros Abastecidos"
									>
									<small class="error-message"
										   v-if="!this.$v.quantity.numeric && this.submitted">
										A quantidade tem de ser um número
									</small>
									<small class="error-message"
										   v-if="!this.$v.quantity.between && this.submitted">
										O abastecimento tem de ser entre 0 e 350 litros
									</small>
								</div>
								<div class="form-group">
									<input v-model="price"
										   type="text"
										   class="form-control"
										   :class="{'has-error':this.$v.price.$invalid && this.submitted}"
										   id="inputPrice"
										   placeholder="Preço por Litro"
									>
									<small class="error-message"
										   v-if="!this.$v.price.decimal && this.submitted">
										O preço tem de ser um número
									</small>
									<small class="error-message"
										   v-if="!this.$v.price.between && this.submitted">
										O preço tem de ser entre 0 e 5€
									</small>
								</div>
								<div class="form-group">
									<input v-model="kilometers"
										   type="text"
										   class="form-control"
										   :class="{'has-error':this.$v.kilometers.$invalid && this.submitted}"
										   id="inputKilometers"
										   placeholder="Kilometros desde o ultimo abastecimento"
									>
									<small class="error-message"
										   v-if="!this.$v.kilometers.numeric && this.submitted">
										Kilometros têm de ser um Número
									</small>
									<small class="error-message"
										   v-if="!this.$v.kilometers.between && this.submitted">
										Kilometros têm de ser entre 0 e 2500
									</small>
								</div>
								<div class="form-group">
									<div class="row text-center">
										<div class="col-6 pr-2">
											<div class="btn-option no-icon"
												 @click="selectVariety('Regular')"
												 :class="{'active':this.variety==='Regular'}"
											>
												Simples
											</div>
										</div>
										<div class="col-6 pl-2">
											<div class="btn-option no-icon"
												 @click="selectVariety('Additive')"
												 :class="{'active':this.variety==='Additive'}"
											>
												Aditivado
											</div>
										</div>
										<div class="col-12 mt-2">
											<small class="error-message"
												   v-if="!this.$v.variety.required && this.submitted">
												Escolha uma Variedade
											</small>
										</div>
									</div>
								</div>
								<div class="form-group mt-4">
									<!--
									<div class="row text-center">
										<div class="col-4 mb-3">
											<div class="btn-option"
												 @click="selectBrand('BP')"
												 :class="{'active':this.brand==='BP'}"
											>
												<font-awesome-icon icon="gas-pump" class="btn-icon"/>
											</div>
											<span class="text-overflow-center">BP</span>
										</div>
										<div class="col-4 mb-3">
											<div class="btn-option"
												 @click="selectBrand('Repsol')"
												 :class="{'active':this.brand==='Repsol'}"
											>
												<font-awesome-icon icon="gas-pump" class="btn-icon"/>
											</div>
											<span class="text-overflow-center">Repsol</span>
										</div>
										<div class="col-4 mb-3">
											<div class="btn-option"
												 @click="selectBrand('Galp')"
												 :class="{'active':this.brand==='Galp'}"
											>
												<font-awesome-icon icon="gas-pump" class="btn-icon"/>
											</div>
											<span class="text-overflow-center">Galp</span>
										</div>
										<div class="col-4">
											<div class="btn-option"
												 @click="selectBrand('Pingo Doce')"
												 :class="{'active':this.brand==='Pingo Doce'}"
											>
												<font-awesome-icon icon="gas-pump" class="btn-icon"/>
											</div>
											<span class="text-overflow-center">Pingo Doce</span>
										</div>
										<div class="col-4">
											<div class="btn-option"
												 @click="selectBrand('Jumbo')"
												 :class="{'active':this.brand==='Jumbo'}"
											>
												<font-awesome-icon icon="gas-pump" class="btn-icon"/>
											</div>
											<span class="text-overflow-center">Jumbo</span>
										</div>
										<div class="col-4">
											<div class="btn-option"
												 @click="selectBrand('Prio')"
												 :class="{'active':this.brand==='Prio'}"
											>
												<font-awesome-icon icon="gas-pump" class="btn-icon"/>
											</div>
											<span class="text-overflow-center">Prio</span>
										</div>
										<div class="col-12 mt-2">
											<small class="error-message"
												   v-if="!this.$v.brand.required && this.submitted">
												Escolha uma Marca
											</small>
										</div>
									</div>
									-->
									<div class="row text-center">
										<div class="col-12" v-if="this.brand===''">
											<div class="vehicle-card" @click="toggleBrands">
												<div class="row align-items-center" >
													<div class="col text-left">
														<span>Escolher Marca</span>
													</div>
													<div class="col-auto text-center ml-auto">
														<font-awesome-icon icon="chevron-right" class="f-gray"/>
													</div>
												</div>
											</div>
										</div>
										<div class="col-12" v-else>
											<div class="vehicle-card" @click="toggleBrands">
												<div class="row align-items-center" >
													<div class="col text-left">
														<img v-if="brandLogo!==''" :src="brandLogo" style="max-height: 50px" class=" d-inline h-100 w-auto mr-2 my-n1" >
														<span class="d-inline">{{brand}}</span>
													</div>
													<div class="col-auto text-center ml-auto">
														<font-awesome-icon icon="chevron-right" class="f-gray"/>
													</div>
												</div>
											</div>
										</div>
										<div class="col-12 mt-2">
											<small class="error-message"
												   v-if="!this.$v.brand.required && this.submitted">
												Escolha uma Marca
											</small>
										</div>
									</div>
								</div>
								<div class="alert alert-danger" role="alert" v-if="this.error!==null">
									{{error}}
								</div>
							</form>
							<refuel-brands v-show="showBrands" :brand="brand" @selectBrand="selectBrand($event, ...arguments)" ></refuel-brands>
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
							<div class="btn-main" :class="{'disabled':!this.loaded}" @click="submit">
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
	const qs = require('querystring');
    import {between, maxLength, numeric, required, decimal} from "vuelidate/lib/validators";
	import RefuelBrands from "@/components/refuel-brands";

    export default {
        name: "add",
        middleware: 'auth',
        components: {RefuelBrands, ShortLayout},
        data(){
            return {
				// Vehicle Data (fetchs favorite vehicle)
				vehicle: null,
                // Form Data
                brand:'',
                variety:'',
                price:'',
                kilometers:'',
                quantity:'',
				// UI Extras
				brandLogo:'',
                // Form Controllers
                submitted: false,
                error: null,
				sending: false,
				showBrands: false,
            }
        },
		mounted() {
			this.$axios.get('/api/profiles/favorite/')
			.then(res => {
				this.vehicle = res.data.vehicle;
				if( this.vehicle === undefined )
					this.$router.push({path: '/dashboard'})
			})
			.catch(error => {
				this.error = error.response.data.error;
			})
		},
		methods:{
            submit(){
                if (this.$v.$invalid)
                    this.submitted=true;
                else {
                	this.sending = true;
                    let refuel = {
                        brand:this.brand,
                        variety:this.variety,
                        price:this.price,
                        kilometers:this.kilometers,
                        quantity:this.quantity,
                    };
                    this.$axios.post('/api/refuels/_'+this.vehicle.license+'/add',
                        qs.stringify(refuel),
                        {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
					.then(res => {
						this.$router.push({path: '/refuels/summary'});
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
                }
            },
            selectVariety(variety){
                this.variety = variety;
            },
            selectBrand(brand){
                this.brand = brand.name;
                this.brandLogo = brand.logo;
				this.showBrands = false;
            },
			toggleBrands(){
				this.showBrands = !this.showBrands;
			},
        },
        validations: {
            brand: {
                required,
            },
            variety: {
                required,
            },
            price: {
                required,
                decimal,
                between: between(0, 5),
            },
            kilometers: {
                required,
                numeric,
                between: between(0, 2500),
            },
            quantity: {
                required,
                numeric,
                between: between(0, 350),
            }
        }
    }
</script>

<style scoped>

</style>
