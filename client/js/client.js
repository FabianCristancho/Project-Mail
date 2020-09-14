var app = new Vue({
    el: '#app',
    data: {
      name: '',
      lastName: '',
      email: ''
    },
    methods: {
        sendData: function(){
            console.log("Name: " +this.name +", Last Name: " +this.lastName);
            axios.get('http://localhost:3000/dataUser', {params: {name: this.name, lastName: this.lastName, email: this.email}})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
});