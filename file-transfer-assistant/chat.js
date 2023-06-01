import {createApp} from '../assets/vue.esm-browser.prod.js';

createApp({
    data() {
        return {
            chatValue: '',
            moveTop: '',
            footerHeight: '130',
            offsetTop: '',
            chatInfo: {
                "code": "1234",
                "createTime": 0,
                "messages": [
                    {
                        "userType": "robot",
                        "createTime": 0,
                        "messageType": "message",
                        "msg": "人类，你好，开始使用人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1我来传输文件吧！1",
                        "files": []
                    },
                    {
                        "userType": "user",
                        "createTime": 0,
                        "messageType": "message",
                        "msg": "22222人类，你好，开始使用人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1我来传输文件吧！1",
                        "files": []
                    },
                    {
                        "userType": "robot",
                        "createTime": 0,
                        "messageType": "message",
                        "msg": "33333人类，你好，开始使用人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1我来传输文件吧！1",
                        "files": []
                    },
                    {
                        "userType": "user",
                        "createTime": 0,
                        "messageType": "file",
                        "msg": "5555人类，你好，开始使用人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1人类，你好，开始使用我来传输文件吧！1我来传输文件吧！1",
                        "files": []
                    },
                    {
                        "userType": "robot",
                        "createTime": 0,
                        "messageType": "file",
                        "msg": "人类，你好，开始使用我来传输文件吧！4",
                        "files": []
                    },
                ]
            },
        };
    },
    mounted() {
        const { top } = this.$refs.topLine.getBoundingClientRect();
        this.offsetTop = top;
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    },
    beforeDestory() {
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    },
    methods: {
        onMouseDown() {
            this.moved = true;
        },
        mouseMove (e) {
            const moveDistence = this.offsetTop - e.clientY;
            if (this.moved && (moveDistence >= 0 && moveDistence < 200)) {
                this.moveTop = e.clientY;
                this.footerHeight = moveDistence + 130;
            }
        },
        mouseUp () {
            this.moved = false;
        },

    },
}).mount('#app');



// const fn = async () => {
//     const arr = Array.from({length: 10}).map((item, index) => {
//         return new Promise(res => {
//             setTimeout(() => {
//                 res(index)
//             }, 2000)
//         })
//     })

//    for (let i=0; i<arr.length; i++) {
//        await Promise.all([arr[i]]).then(res => { // 按我的想法，应该是每隔两秒log一次index，结果是两秒后同时出来。
//            console.log('res::: ', res);
//        })
//    }
// }

// fn();