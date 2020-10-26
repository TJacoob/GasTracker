
<script>
import { Line } from 'vue-chartjs'

export default {
	name: "refuel-chart",
	extends: Line,
	props: {
		rawData: {
			type: Array,
			default: null
		}
	},
	data: () => ({
		data:[],
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
			},
			tooltips:{
				enabled: false,
			}
		}
	}),
	mounted () {
		// Transform Data to match the necessities of the chart plugin
		let consumption = [];
		let dates = [];
		const dataLimited = this.rawData.slice(Math.max(this.rawData.length - 10, 0))
		dataLimited.forEach(function(refuel, index){
			// Consumption Calculations
			consumption.push((100*refuel.quantity)/refuel.kilometers);
			// Date Formatting
			const rawDate = new Date(refuel.date);
			const formattedDate = rawDate.getDate() + '-' + (rawDate.getMonth()+1);
			dates.push(formattedDate);
		})

		this.data.datasets = [{
			backgroundColor: '#EF9D10',
			borderColor: '#EF9D10',
			fill: false,
			data: consumption,
		}];
		this.data.labels = dates;


		// Render Chart
		this.renderChart(this.data, this.options)
	}
}
</script>

<style scoped>

</style>
