<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<form ref="refuelAddForm" @submit.prevent="submit">
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
									   v-if="!this.$v.price.numeric && this.submitted">
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
										<div class="btn-option no-icon ">
											Simples
										</div>
									</div>
									<div class="col-6 pl-2">
										<div class="btn-option no-icon active">
											Aditivado
										</div>
									</div>
								</div>
							</div>
							<div class="form-group mt-4">
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
							<nuxt-link to="/vehicles/add">
								<div class="btn-main">
									<span>Adicionar</span>
								</div>
							</nuxt-link>
						</div>
						<div class="row mt-5 justify-content-center text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/dashboard">
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
	</BaseLayout>
</template>
<script>
    import BaseLayout from "../../layout/default";
    import {between, maxLength, numeric, required} from "vuelidate/lib/validators";

    export default {
        name: "add",
        middleware: 'auth',
        components: { BaseLayout },
        data(){
            return {
                // Form Data
                brand:'',
                variety:'',
                price:'',
                kilometers:'',
                quantity:'',
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
                    let refuel = {
                        brand:this.brand,
                        variety:this.variety,
                        price:this.price,
                        kilometers:this.kilometers,
                        quantity:this.quantity,
                    };
                    // TODO: Escolher automaticamente qual o carro a usar
                    this.$axios.post('/api/refuels/{car}/add',
                        qs.stringify(refuel),
                        {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
                        .then(res => {
                            //this.$router.push({name:'vehicles'});
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
                this.brand = brand;
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
                numeric,
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
