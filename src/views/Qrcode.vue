<template>
	<div class="container">
		<button class="scan" @click="scanCode">扫二维码</button>
		<button class="scanbarcode" @click="scanmulticodesatrt">扫二维码和条形码</button>
		<div>扫描二维码内容:{{ qrcodeinfo }}</div>
		<div>扫描二维码和条形码内容:{{ multiinfo }}</div>

		<div class="reader-box" v-if="isScaning">
			<div class="reader" id="reader"></div>
		</div>
		<div id="qr-reader" style="width:400px"></div>
		<barcode value="1234" format="CODE39">
			Show this if the rendering fails.
		</barcode>
	</div>
</template>

<script>
import {
	Html5Qrcode, Html5QrcodeScanner
} from 'html5-qrcode';
import VueBarcode from 'vue-barcode';

let html5QrcodeScanner = null;
export default {
	components: {
		'barcode': VueBarcode
	},
	data() {
		return {
			html5Qrcode: null,
			isScaning: false,
			qrcodeinfo: "",
			multiinfo: "",
		}
	},
	mounted() {

	},
	methods: {
		startScan() {
			this.isScaning = true;
			Html5Qrcode.getCameras().then(devices => {
				if (devices && devices.length) {
					this.html5Qrcode = new Html5Qrcode('reader');
					this.html5Qrcode.start({
						facingMode: 'environment',
					}, {
						fps: 500,
						qrbox: 280
					}, (decodeText, decodeResult) => {
						console.log(decodeText)
						if (decodeText) {
							this.qrcodeinfo = decodeText;
							this.stopScan();
							this.isScaning = false;
						}
					}, (err) => {
						console.log(err)
					});
				}
			});
		},
		stopScan() {
			this.html5Qrcode.stop();
		},
		scanCode() {
			this.startScan();
		},
		scanmulticodesatrt() {
			html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
			html5QrcodeScanner.render(this.onScanSuccess, this.onScanError);
			// html5QrcodeScanner.render(this.onScanSuccess,this.onScanError);

		},
		onScanSuccess(decodedText, decodeResult) { /** decoded message */
			this.multiinfo = decodedText;
			html5QrcodeScanner.clear();

		},
		onScanError(errorMessage) {
			// handle on error condition, with error message
		}
	}
}
</script>

<style scoped>
.container {
	height: 100%;
}

.reader-box {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
}

.reader {
	width: 540rpx;
	height: 540rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
