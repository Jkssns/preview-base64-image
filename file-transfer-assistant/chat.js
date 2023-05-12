import {createApp} from '../assets/vue.esm-browser.prod.js';
console.log("12341234::: ", 12341234);
createApp({
    data() {
        return {
            chatValue: '1111111',
            moveTop: '',
            footerHeight: '130',
            offsetTop: '',
        };
    },
    mounted() {
        const { top } = this.$refs.topLine.getBoundingClientRect();
        this.offsetTop = top;
    },
    methods: {
        onMouseDown() {
            this.moved = true;
            const mouseMove = (e) => {
                console.log('e::: ', e);
                if (this.moved) {
                    this.moveTop = e.clientY;
                    this.footerHeight = e.clientY - 130;
                    console.log('this.footerHeight::: ', this.footerHeight);
                }
            }
            const mouseUp = () => {
                this.moved = false;
            }
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('up', () => {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseUp', mouseUp);
            });
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