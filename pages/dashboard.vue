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
						<div v-if="vehicles.length > 0">
							<VueSlickCarousel
								:arrows="true"
								:dots="false"
								:infinite="false"
								@afterChange="changeFavorite"
								ref="vehicleSlider"
							>
								<div v-for="vehicle in vehicles" class="dashboard-vehicle">
									<img src="~/assets/images/car_illustration.svg" class="img-fluid px-4 mb-3" >
									<!--
									<img src="~/assets/images/samplecar.png" class="img-fluid px-3" >
									<font-awesome-icon icon="car" class="fa-10x f-gray"/>
									-->
									<h1 class="font-weight-bold mb-0">{{vehicle.name}}</h1>
									<p class="">{{vehicle.license}}</p>
									<div class="row justify-content-center mb-3">
										<div class="col-4" v-if="vehicle.consumption!==0">
											<span class="d-block">
												<span class="font-weight-bold">{{vehicle.consumption.toFixed(2)}}</span>
												l
											</span>
											<div class="fill-bar my-1"
												 :class="{
													'improving':vehicle.consumption<=5,
													'stable':vehicle.consumption>5 && vehicle.consumption<7,
													'worsening':vehicle.consumption>=7,
												 }"></div>
											<small class="d-block">por 100km</small>
										</div>
									</div>
								</div>
							</VueSlickCarousel>
						</div>
						<div v-else class="text-center">
							<p>Adicione um carro antes de registar um abastecimento</p>
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
							<nuxt-link to="/refuels/add" v-if="vehicles.length>0" >
								<div class="btn-main">
									<span>Abastecer</span>
								</div>
							</nuxt-link>
							<nuxt-link to="/vehicles/add" v-else>
								<div class="btn-main">
									<span>Registar Carro</span>
								</div>
							</nuxt-link>
						</div>
						<div class="row mt-5 justify-content-center text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/refuels" :event="this.vehicles.length===0 ? '':'click'">
									<div class="btn-square mx-auto"
										 :class="{'disabled':this.vehicles.length===0}">
										<font-awesome-icon icon="chart-line" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Consumos</span>
								</nuxt-link>
							</div>
							<div class="w-100 d-none d-sm-block d-lg-none mb-sm-3"></div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4">
								<nuxt-link to="/vehicles">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="car" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Carros</span>
								</nuxt-link>
							</div>
							<div class="w-100 d-none d-sm-block d-lg-none mb-sm-3"></div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/profile">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="user" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Perfil</span>
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
	// TODO: Trocar de Favorito quando se faz scroll no slider
    import BaseLayout from "../layout/default";
    import VueSlickCarousel from 'vue-slick-carousel'

    export default {
        name: "dashboard",
        middleware: 'auth',
        components: { BaseLayout, VueSlickCarousel },
        data(){
            return{
                // Data
                vehicles: [],
				favorite_vehicle: null,
				loaded: false,
                // Control
                error: '',
            };
        },
        mounted(){
            this.getOwnVehicles();
        },
		methods:{
        	changeFavorite(index){
				this.$axios.post('/api/profiles/favorite/_'+this.vehicles[index].license)
					.then(res => {
						if(res.success)
							this.getOwnVehicles();
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
			},
			getOwnVehicles(){
				this.$axios.get('/api/vehicles/own/')
					.then(res => {
						this.vehicles = res.data.vehicles;
						if( this.vehicles.length === 0 ){
							this.loaded=true;
						}
						else if( this.vehicles.length === 1 ){
							this.favorite_vehicle = res.data.vehicles[0];
							this.loaded=true;
						}
						else if ( this.vehicles.length > 1 )
							this.getFavorite();

					})
					.catch(error => {
						this.error = error.response.data.error;
					})
			},
			getFavorite(){
				this.$axios.get('/api/profiles/favorite/')
					.then(res => {
						if( res.data.success){
							this.favorite_vehicle = res.data.vehicle;
							let favorite_index = null;
							this.vehicles.forEach((vehicle, index)=>{
								if(vehicle.license===this.favorite_vehicle.license){
									favorite_index = index;
									return;
								}
							})
							this.$refs.vehicleSlider.goTo(favorite_index);
							this.loaded = true;
						}
					})
					.catch(error => {
						this.error = error.response.data.error;
					})
			},

		},
    }
</script>

<style scoped>

</style>
