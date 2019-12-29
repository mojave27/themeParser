export const theme = {
	color1: {
		hex: '#FFFFFF',
		rgba: alpha => buildRgba(255, 255, 255, alpha)
	},
	get color1_text() {
		return this.color5
	},
	color2: {
		hex: '#0D8C7F',
		rgba: alpha => buildRgba(13, 140, 127, alpha)
	},
	get color2_text() {
		return this.color5
	},
	color3: {
		hex: '#7CBF17',
		rgba: alpha => buildRgba(124, 191, 23, alpha)
	},
	get color3_text() {
		return this.color5
	},
	color4: {
		hex: '#0C7285',
		rgba: alpha => buildRgba(12, 114, 133, alpha)
	},
	get color4_text() {
		return this.color1
	},
	color5: {
		hex: '#09734C',
		rgba: alpha => buildRgba(9, 115, 76, alpha)
	},
	get color5_text() {
		return this.color1
	},
}