<template>
	<div class="row justify-content-center mb-4">
		<div class="col-4 mb-3 text-center" v-for="(option,index) in brands" :key="index">
			<div class="btn-option"
				 @click="selectBrand(option.name, option.logo)"
				 :class="{'active':brand===option.name}"
			>
				<img v-if="option.logo!==''" :src="option.logo" class="btn-image">
				<font-awesome-icon v-else icon="gas-pump" class="btn-icon"/>
			</div>
			<span class="text-overflow-center">{{option.name}}</span>
		</div>
	</div>
</template>

<script>
const getBrands = () => import('~/data/refuel_brands.json').then(m => m.default || m)

export default {
	name: "refuel-brands",
	props: ['brand'],
	data: () => ({
		brands: []
	}),
	async asyncData () {
		const brands = await getBrands()
		return { brands }
	},
	async created () {
		this.brands = await getBrands();
	},
	methods: {
		selectBrand(name, logo){
			this.$emit('selectBrand', {name:name,logo:logo})
		}
	}
}

</script>

<style scoped>

</style>
