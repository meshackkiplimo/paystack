
function payWithPaystack() {

    var handler = PaystackPop.setup({
        key: process.env.PAYSTACK_PUBLIC, //put your public key here
        email: 'meshackkimaiyo5@gmail.com', //put your customer's email here
        amount: 370000, //amount in KES cents (3700 KES)
        currency: 'KES', //explicitly specify KES currency
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+254727463152" //customer's mobile number
                }
            ]
        },
        callback: function (response) {
            //after the transaction have been completed
            //make post call  to the server with to verify payment 
            //using transaction reference as post data
            $.post("/verify", {reference:response.reference}, function(status){
                if(status == "success")
                    //successful transaction
                    alert('Transaction was successful');
                else
                    //transaction failed
                    alert(response);
            });
        },
        onClose: function () {
            //when the user close the payment modal
            alert('Transaction cancelled');
        }
    });
    handler.openIframe(); //open the paystack's payment modal
}
