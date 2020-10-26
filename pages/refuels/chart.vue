<template>
	<BaseLayout>
		<div slot="content" class="content-position my-auto">
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
						<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4" id="refuels-chart">
							<div v-if="this.refuels.length===0">
								<p class="text-center">Ainda não fez nenhum abastecimento no carro atual</p>
							</div>
							<div v-else class="text-center">
								<p class="text-center">Média de Consumo dos ultimos 10 Abastecimentos (litros/100kms)</p>
								<refuel-chart :raw-data="refuels" class="consumption-trend" ></refuel-chart>
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
							<nuxt-link to="/refuels/add">
								<div class="btn-main">
									<span>Abastecer</span>
								</div>
							</nuxt-link>
						</div>
						<div class="row mt-5 justify-content-start text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/refuels" :event="this.loaded?'click':''">
									<div class="btn-square mx-auto" :class="{'disabled':!this.loaded}">
										<font-awesome-icon icon="list" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Lista</span>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layout/default";
import RefuelChart from "@/components/refuel-chart";

export default {
	name: "chart",
	middleware: 'auth',
	components: {RefuelChart, BaseLayout },
	data(){
		return{
			// Data
			vehicle: null,
			refuels: [],
			// Control
			error: '',
			loaded: false,
		};
	},
	mounted(){
		this.$axios.get('/api/profiles/favorite/')
			.then(res => {
				this.vehicle = res.data.vehicle;
				if( this.vehicle === undefined )
					this.$router.push({path: '/dashboard'})
				else
					this.$axios.get('/api/refuels/_'+this.vehicle.license+'/')
						.then(res => {
							this.refuels = res.data.refuels;
							this.loaded = true;
						})
						.catch(error => {
							this.error = error.response.data.error;
						})
			})
			.catch(error => {
				this.error = error.response.data.error;
			});

	},
	/*
	updated(){
		let elmnt = document.getElementsByClassName('vehicle-card');
		elmnt.item(elmnt.length-1).scrollIntoView(true);
	},
	*/
	methods:{
		formatDate: function(date){
			let raw = new Date(date);
			return raw.getDate() + '-' + (raw.getMonth()+1) + '-' + raw.getFullYear();
		},
	},
}
</script>

<style scoped>

</style>
