var x = 1
//declaring vars
// for errors and
//script validations
var using_cc = true;
var is_cvv_valid = false;
var is_name_valid = false;
var is_email_valid = false;
var is_cc_is_correct = true;
var is_activity_valid = false;
var is_zip_code_valid = false;
//Total is price for activities
var total = $("<p>Total: $0</p>")
var paypal = $('#paypal').hide();
var bitcoin = $('#bitcoin').hide();
var credit_card = $('#credit-card');
var is_cc_inofrmation_valid = false;
//Here I declare errors and requests
var design_puns = $('#color option:even');
var design_heart = $('#color option:odd');
var name_of_user = $('<p> Enter your name </p>')
//choosing other methods of payment fot the event
var zipCode = $('<p> Enter 5 digit Zip Code</p>');
var cvvNum = $('<p> Enter 3 digit CVV Code </p>');
var ccNum = $('<p> Enter your credit card number </p>');
var email = $('<p> Here you should enter your email!</p>');
var cvvNum_Error = $('<p style="color:red;"> CVV Code must contain 3 digits </p>')
var zipCode_Error = $('<p style="color:red;"> Zip Code must contain 5 digits </p>');
var cbox_Error = $('<p style="color:red;"> You should select at least one activity!</p>');
var name_Error = $('<p style="color:red;">Enter your name without digits and special characters</p>');
var cc_Error = $('<p style="color:red;"> Please enter a number that is between 13 and 16 digits long.</p>');
var email_Error = $('<p style="color:red;"> Check your email! It should look something like this: Bob@gmail.com</p>');
// <------------------------------APPENDING-WHAT-I-HAVE-DECLARED-BEFORE----------------------------------------------->\\
$('#credit-card div:eq(1)').append( zipCode_Error.hide());
$('#credit-card div:last').append(cvvNum_Error.hide());
$('#credit-card div:first').append(cc_Error.hide());
$('.activities legend').append(cbox_Error.hide());
$('#credit-card div:eq(1)').append( zipCode.hide());
$('#credit-card div:first').append(ccNum.hide());
$('#credit-card div:last').append(cvvNum.hide());
//selrcting credit card as default payment option
$('#payment option:first').attr("selected",true);
$('#email_text').append(email_Error.hide());
$('#name_text').append(name_Error.hide());
$('#email_text').append(email.hide());
total.html("<p>Total: $"+ 0 + "</p>");
$('#name_text').append(name_of_user);
$('.activities').append(total);
$('#colors-js-puns').hide();
$('#other').hide();
$('#name').focus();
//returns total price
function returnPrice(){
  var price = 0;
  $('.activities input[type=checkbox]').each(function(x){
    //if it is 1st checkbox add 200, else add 100
      if(x === 0 && $(this).is(':checked')){
        price = price + 200;
        is_activity_valid = true;
      } 
      else if ($(this).is(':checked')) {
        price = price + 100;
        is_activity_valid = true;
      }
      //set is_activity_valid true if price is greater then 0
      if(price > 0){
        is_activity_valid = true;
      } else{
        is_activity_valid = false;
      }
  });
  return(price)
}
$('#payment').on('change', function(event){
  if(event.target.value === 'credit card'){
    credit_card.show();
    bitcoin.hide();
    paypal.hide();
    using_cc = true;
  } 
  if (event.target.value === 'paypal') {
    credit_card.hide();
    bitcoin.hide();
    paypal.show();
    using_cc = false;
  } 
  if (event.target.value === 'bitcoin') {
    credit_card.hide();
    bitcoin.show();
    paypal.hide();
    using_cc = false;
  }
});
$('#title').on('change', function(event){
  if(event.target.value == 'other'){
    $('#other').show();
  } else {
    $('#other').hide();
  }
});
//I made x to delete "Select item" from list
$('#design').on('change', function(event) {
  //We need to remove options, then append specified color option
  $('#color option').remove();
  //One time if statement to remove "Select Option", and show color option
  if(x==1){
    $('#design option:first').remove()
    $('#colors-js-puns').show();
    x=0;
  }
 if (event.target.value === 'js puns') {
    $('#color').append(design_puns);
  }
  if(event.target.value === 'heart js'){
    $('#color').append(design_heart);
  }
});
//This method verifies that name text is ok
$('#name').on('focus input', function(event){
  if(/^[a-z A-Z]+$/.test(event.target.value)){
    name_Error.hide();
    name_of_user.hide()
    is_name_valid = true;
  } else if(event.target.value===""){
    name_Error.hide()
    name_of_user.show()
    is_name_valid = false;
  } else{
    name_Error.show();
    name_of_user.hide()
    is_name_valid = false;
  }
})
//This method verifies the mail adress is ok
$('#mail').on('focus input', function(event) {
  if(/^[^@]+@[^@.]+\.[a-z]+$/.test(event.target.value)){
    email.hide();
    email_Error.hide()
    is_email_valid = true;
  } else if (event.target.value === "") {
    email.show();
    email_Error.hide();
    is_email_valid = false;
  } else {
    email.hide();
    email_Error.show();
    is_email_valid = false;
  }
});
function validate_cc(){
  console.log("validating your cc")
  var z = true;
  if(using_cc === true){
    if(is_cc_inofrmation_valid === false){
      alert("You must enter card number correctly!");
      z = false
    }
    if(is_cvv_valid === false){
      alert("You must enter CVV code correctly!");
      z = false
    }
    if(is_zip_code_valid === false){
      alert("You must enter Zip code correctly!");
      z=false;
    }
    z=true;
  }
  return(z)
  }
//This method verify, that everything is filled
$('#submit_button').on('click', function(event){
  var x = validate_cc()
  if(is_activity_valid === false || is_name_valid === false || is_email_valid === false || x===false){
    event.preventDefault();
  }
  if(is_name_valid === false){
    alert("You must enter your name correctly!");
  }
  if(is_email_valid === false){
    alert("You must enter valid email!");
  }
  if(is_activity_valid === false){
    alert("You must select at least one activity!");
  }
  }
);
//If credit card selected, verifies that everythig ok
$('#credit-card').on('focusin input', function(event){
  if(event.target.name === 'user-cc-num'){
    if(/^\d{13,16}$/.test(event.target.value)){
      ccNum.hide();
      cc_Error.hide();
      is_cc_inofrmation_valid = true;
    } else  if(event.target.value === ''){

      ccNum.show();
      cc_Error.hide();
      is_cc_inofrmation_valid = false;
    } else {

      ccNum.hide();
      cc_Error.show();
      is_cc_inofrmation_valid = false;
    }
  }
  if(event.target.name === 'user-zip'){
    if(/^\d{5}$/.test(event.target.value)){
       zipCode.hide();
       zipCode_Error.hide();
      is_zip_code_valid = true;
    } else  if(event.target.value === ''){

       zipCode.show();
       zipCode_Error.hide();
      is_zip_code_valid = false;

    }else {

       zipCode.hide();
       zipCode_Error.show()
      is_zip_code_valid = false;
    }
  }
  if(event.target.name === 'user-cvv'){
    if(/^\d{3}$/.test(event.target.value)){

      cvvNum.hide();
      cvvNum_Error.hide()
      is_cvv_valid = true;
    } else  if(event.target.value === ''){

      cvvNum.show()
       zipCode_Error.hide()
      is_cvv_valid=false;

    }else {

      cvvNum.hide();
      cvvNum_Error.show()
      is_cvv_valid = false;
    }
  }
});
//If checkbox checked, it disables and crosses out text
$('input[type=checkbox]').on('change', function(event){

  if($(this).attr('name') == 'js-frameworks' && $(this).is(':checked')){
    $('input[type=checkbox]').eq(3).attr('disabled', true) 
    $('.activities label').eq(3).wrap("<strike>");
    $('input[type=checkbox]').eq(5).attr('disabled', true) 
    $('.activities label').eq(5).wrap("<strike>");
  } else if ($(this).attr('name') == 'js-frameworks') {
    $('input[type=checkbox]').eq(3).attr('disabled', false) 
    $('.activities label').eq(3).unwrap()
    $('input[type=checkbox]').eq(5).attr('disabled', false) 
    $('.activities label').eq(5).unwrap()
  }
  if($(this).attr('name') == 'express' && $(this).is(':checked')){
    $('input[type=checkbox]').eq(1).attr('disabled', true) 
    $('.activities label').eq(1).wrap("<strike>");
    $('input[type=checkbox]').eq(5).attr('disabled', true) 
    $('.activities label').eq(5).wrap("<strike>");
  } else if ($(this).attr('name') == 'express') {
    $('input[type=checkbox]').eq(1).attr('disabled', false)
    $('.activities label').eq(1).unwrap() 
    $('input[type=checkbox]').eq(5).attr('disabled', false)
    $('.activities label').eq(5).unwrap()
 
  }
   if($(this).attr('name') == 'js-libs' && $(this).is(':checked')){
     $('input[type=checkbox]').eq(4).attr('disabled', true) 
     $('.activities label').eq(4).wrap("<strike>");
     $('input[type=checkbox]').eq(6).attr('disabled', true) 
     $('.activities label').eq(6).wrap("<strike>");
   } else if ($(this).attr('name') == 'js-libs') {
     $('input[type=checkbox]').eq(4).attr('disabled', false) 
     $('.activities label').eq(4).unwrap()
     $('input[type=checkbox]').eq(6).attr('disabled', false) 
     $('.activities label').eq(6).unwrap()
     
   }
   if($(this).attr('name') == 'build-tools' && $(this).is(':checked')){
     
     $('input[type=checkbox]').eq(1).attr('disabled', true) 
     $('.activities label').eq(1).wrap("<strike>");
     $('input[type=checkbox]').eq(3).attr('disabled', true) 
     $('.activities label').eq(3).wrap("<strike>");
   } else if ($(this).attr('name') == 'build-tools') {
     $('input[type=checkbox]').eq(1).attr('disabled', false) 
     $('.activities label').eq(1).unwrap()
     $('input[type=checkbox]').eq(3).attr('disabled', false) 
     $('.activities label').eq(3).unwrap()
   }


   if($(this).attr('name') == 'npm' && $(this).is(':checked')){
     
    $('input[type=checkbox]').eq(2).attr('disabled', true) 
    $('.activities label').eq(2).wrap("<strike>");
    $('input[type=checkbox]').eq(4).attr('disabled', true) 
    $('.activities label').eq(4).wrap("<strike>");
  } else if ($(this).attr('name') == 'npm') {
    $('input[type=checkbox]').eq(2).attr('disabled', false) 
    $('.activities label').eq(2).unwrap()
    $('input[type=checkbox]').eq(4).attr('disabled', false) 
    $('.activities label').eq(4).unwrap()
  }


  if($(this).attr('name') == 'node' && $(this).is(':checked')){
     
    $('input[type=checkbox]').eq(2).attr('disabled', true) 
    $('.activities label').eq(2).wrap("<strike>");
    $('input[type=checkbox]').eq(6).attr('disabled', true) 
    $('.activities label').eq(6).wrap("<strike>");
  } else if ($(this).attr('name') == 'node') {
    $('input[type=checkbox]').eq(2).attr('disabled', false) 
    $('.activities label').eq(2).unwrap()
    $('input[type=checkbox]').eq(6).attr('disabled', false) 
    $('.activities label').eq(6).unwrap()
  }
   total.html("<p>Total: $"+ returnPrice() + "</p>");
});

