const generatePassword = () => {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '1234567890' + '!@#$%^&()_+~`|}{[]:;?><,./-=';
        for (var i = 1; i <= 16; i++) {
          var char = Math.floor(Math.random() * str.length + 1);
          pass += str.charAt(char)
        }
        return pass;
      
}
module.exports =generatePassword