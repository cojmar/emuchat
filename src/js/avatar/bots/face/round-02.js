export default (color, texture) => `
	<path fill-rule="evenodd" clip-rule="evenodd" d="M0 31C0 31.0205 0.0141049 30.8164 0 30C0.183375 29.5235 0.402009 28.5029 1 27C1.82671 23.944 3.7804 20.4435 7 17C16.6944 6.60017 35.1724 0 65 0C94.8276 0 113.306 6.60036 123 17C126.22 20.4435 128.173 23.944 129 27C129.598 28.5029 129.817 29.5236 130 30C129.986 30.8164 130 31.0205 130 31V70C130 69.8964 129.972 70.5012 130 71C129.739 73.1171 129.471 75.0149 129 77C127.814 82.9912 125.606 88.911 122 94C112.283 110.337 94.2553 120 65 120C35.7448 120 17.7164 110.338 8 94C4.39414 88.9108 2.1865 82.9912 1 77C0.529043 75.0149 0.261028 73.1171 0 71C0.0282767 70.5466 6.49997e-05 69.6771 0 70V31Z" fill="#E1E6E8"/>
	<mask id="faceRound02Mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="130" height="120">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M0 31C0 31.0205 0.0141049 30.8164 0 30C0.183375 29.5235 0.402009 28.5029 1 27C1.82671 23.944 3.7804 20.4435 7 17C16.6944 6.60017 35.1724 0 65 0C94.8276 0 113.306 6.60036 123 17C126.22 20.4435 128.173 23.944 129 27C129.598 28.5029 129.817 29.5236 130 30C129.986 30.8164 130 31.0205 130 31V70C130 69.8964 129.972 70.5012 130 71C129.739 73.1171 129.471 75.0149 129 77C127.814 82.9912 125.606 88.911 122 94C112.283 110.337 94.2553 120 65 120C35.7448 120 17.7164 110.338 8 94C4.39414 88.9108 2.1865 82.9912 1 77C0.529043 75.0149 0.261028 73.1171 0 71C0.0282767 70.5466 6.49997e-05 69.6771 0 70V31Z" fill="white"/>
	</mask>
	<g mask="url(#faceRound02Mask0)">
		<rect x="-4" y="-2" width="138" height="124" fill="${color.hex}"/>
		${texture}
	</g>
`