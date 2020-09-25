var app = new Vue({
    el: '#app',
    data: {
      red: '',
      green: '',
      blue: '',
      email: ''
    },
    methods: {
        sendData: function(){
            console.log("Name: " +this.red +", Last Name: " +this.blue);
            axios.get('http://localhost:3000/dataUser', {params: {red: this.red, green: this.green, blue: this.blue, email: this.email}})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
});