const fileDom = document.querySelector('.file_dom');
const uploadWrapper = document.querySelector('.upload');
const downloadWrapper = document.querySelector('.download');
const getFileListDom = document.querySelector('.get_file_list');
const prompt_wrapper = document.querySelector('.prompt_wrapper');
const prompt_field = document.querySelector('.prompt_field');
const delete_file_item = document.querySelector('.delete_file_item');

let uploadUrls = [];
let downloadUrls = [];
const client = new OSS({
	region: 'oss-cn-beijing',
	accessKeyId: 'LTAI5tKECR15VeWFvxoucW3r',
	accessKeySecret: '3fhilyTFOBVds77F4DWwjiLaT71n9X',
	bucket: 'temporary-files-b',
});

window.onload = () => {
	const arr = JSON.parse(window.localStorage.getItem('uploadUrls') || "[]");
	arr.forEach(item => {
		if (Number(item.progress) < 100) {
			client.abortMultipartUpload(item.fullname, item.uploadId);
		} else {
			uploadUrls.push(item);
		}
	});
	if (uploadUrls.length) {
		handleUploadOl();
	}
}

// 获取取件码
const getCode = (text = '请输入至少4位的，数字或字母组成的取件码。') => {
    const code = prompt(text);
	if (!code) { 
		return;
	}
    if (/[1-9A-z]{4}/.test(code)) {
        return code;
    } else {
        return getCode();
    }
};

// 上传文件
fileDom.onchange = async e => {
    const code = getCode();
	if (!code) {
		alert('取件码不能为空！');
		return;
	}
	const path = code + '/'; 
    const fileArr = Array.from(e.target.files);

	fileArr.forEach((item, index) => {
		try {
			const obj = {
				name: item.name,
				id: 'upload' + item.name + index,
				fullname: path + item.name,
				progress: '0',
			}
			uploadUrls.push(obj);
			// 分片上传。
			client.multipartUpload(path + item.name, item, {
				progress: (p, cpt, res) => {
					obj.uploadId = cpt.uploadId;
					obj.progress = (p * 100).toFixed(2);
					let dom = document.getElementById(obj.id);
					if (dom) {
						dom.querySelector('.file_item_percentage').innerText = obj.progress + '%';
						if (p >= 1) {
							handleUploadOl();
						}
					} else {
						handleUploadOl();
					}
				},
				mime: 'application/octet-stream',
			});
		} catch (err) {
			console.log(err);
		}
	})
};

// 更新上传列表
const handleUploadOl = () => {
    uploadWrapper.innerHTML = uploadUrls.map((item, index) => {
        return `<li class="file_item" id="${item.id}">
					<span class="file_item_name">${item.name}</span>
					<span class="file_item_percentage">${item.progress}%</span>
					<svg class="file_item_action" style="display: ${item.progress >= 100 ? 'inline' : 'none'}" data-fullname="${item.fullname}" data-index="${index}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3578" width="24" height="24"><path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z" fill="#666666" p-id="3579"></path></svg>
				</li>`;
    }).join('');
	localStorage.setItem('uploadUrls', JSON.stringify(uploadUrls));
};

// 更新下载列表
const handleDownloadOl = () => {
    downloadWrapper.innerHTML = downloadUrls.map(item => {
        return `<li class="file_item">
					<span class="file_item_name">${item.name}</span>
					<a href="${item.url}" download="${item.name}">
						<svg class="file_item_action" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3402" width="24" height="24"><path d="M896 672c-17.066667 0-32 14.933333-32 32v128c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-128c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v128c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-128c0-17.066667-14.933333-32-32-32z" fill="#666666" p-id="3403"></path><path d="M488.533333 727.466667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l213.333333-213.333334c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-157.866667 157.866667V170.666667c0-17.066667-14.933333-32-32-32s-34.133333 14.933333-34.133333 32v456.533333L322.133333 469.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.333334z" fill="#666666" p-id="3404"></path></svg>
					</a>
				</li>`;
    }).join('');
};

// 根据取件码查询文件
getFileListDom.onclick = async () => {
	const code = getCode('输入取件码，获取上传文件。');
	if (!code) {
		return;
	}
	downloadUrls = await hasFile(code);
	if (downloadUrls.length <= 0) {
		alert('该取件码没有文件！');
	} else {
		handleDownloadOl();
	}
}	

const hasFile = async name => {
	const dirName = name + '/';
	let result = await client.list({
		prefix: dirName,
		delimiter: '/',
	});
	return result.objects.map(item => {
		return {
			name: item.name.replace(dirName, ''),
			url: item.url,
		}
	});
};

// 删除文件
uploadWrapper.onclick = async (e) => {
	if (e.srcElement.nodeName === 'svg') {
		const { fullname, index } = e.srcElement.dataset;
		client.delete(fullname);
		uploadUrls.splice(index, 1);
		handleUploadOl();
	}
}  
