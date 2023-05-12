const leftWrapper = document.querySelector('.left_wrapper');
const rightWrapper = document.querySelector('.right_wrapper');
const ipt = document.querySelector('.base64_input');
const img = document.querySelector('.base64_img');
const middle = document.querySelector('.middle');
const tipLeft = document.querySelector('.tip_left');
let dobounceTimer = null; // 输入框防抖
let documentWidth = window.innerWidth; // 视图宽度

// 拖动条事件
const mouseMove = (e) => {
	if (e.clientX <= 100 || documentWidth - e.clientX <= 100) {
		return;
	}
	middle.style.left = e.clientX + 'px';
	leftWrapper.style.width = e.clientX + 'px';
}

// 拖动条事件
const mouseUp = () => {
	changeClass();
	document.removeEventListener('mousemove', mouseMove);
	document.removeEventListener('mouseup', mouseUp);
}

// 拖动条事件
middle.onmousedown = () => {
	changeClass();
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);
}

// 拖动条样式控制
const changeClass = () => {
	middle.classList.toggle('active');
	leftWrapper.classList.toggle('active');
	rightWrapper.classList.toggle('active');
}

// 控制tip显示隐藏
const showLeftTip = (inputValue) => {
	if (inputValue) {
		tipLeft.style.display = 'none';
	} else {
		tipLeft.style.display = 'block';
	}
}

// 图片出错隐藏自身
img.onerror = (e) => {
	e.target.style.display = 'none'
}

// 输入框事件，回显图片
ipt.oninput = (e) => {
	showLeftTip(e.target.value);
	dobounceTimer && clearTimeout(dobounceTimer);
	dobounceTimer = setTimeout(() => {
		img.src = e.target.value;
		img.style.display = 'block';
	}, 300)
}

// 回显文件base64
rightWrapper.ondragover = (e) => {
	e.preventDefault();
}
rightWrapper.ondrop = (e) => {
	e.preventDefault();
	const file = e.dataTransfer.files[0];
	const fileReader = new FileReader();
	fileReader.onload = (e) => {
		ipt.value = e.target.result;
		showLeftTip(ipt.value);
	}
	fileReader.readAsDataURL(file);
}
