<template>
    <div>{{dateFormat(date)}}</div>
</template>
<script>
    export default {
       data(){return{date:new Date(),}},
       mounted () {
            var _this = this; //声明一个变量指向vue实例this,保证作用域一致
            this.timer = setInterval(function() {
                _this.date = new Date();//修改数据date
            }, 1000);
        },
        beforeDestroy () {
            if(this.timer) {
                clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
            }
        },
        methods:{
            dateFormat(time) {
                var date=new Date(time);
                var year=date.getFullYear();
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                this.$emit('time',this.date)
                return year+"/"+month+"/"+day+" "+hours+":"+minutes+":"+seconds;
            }
        }
    }
</script>
