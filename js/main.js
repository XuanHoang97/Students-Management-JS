function emailIsValid(email) {
    /^[^\s@] + @[^\s@] + \.[^\s@]+$/.test(email)
}

function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let addr = document.getElementById('addr').value;
    let gender = "";
    let male = document.getElementById('male');
    let female = document.getElementById('female');
    if (male.checked) {
        gender = male.value;
    } else if (female.checked) {
        gender = female.value;
    }

    let isFullname = document.getElementById('fullname--error');
    let isMail = document.getElementById('mail--error');
    let isPhone = document.getElementById('phone--error');
    let isAddr = document.getElementById('addr--error');

    if (_.isEmpty(fullname)) {
        isFullname.innerHTML = 'Vui lòng nhập đầy đủ họ tên';
    } else if (fullname.trim().length <= 2) {
        isFullname.innerHTML = 'Họ và tên không được nhỏ hơn 2 ký tự';
    } else if (fullname.trim().length > 20) {
        isFullname.innerHTML = 'Không được nhâp lớn hơn 20 ký tự ';
    } else {
        isFullname.innerHTML = '';
    }

    if (_.isEmpty(email)) {
        isMail.innerHTML = "Vui lòng nhập email";
    } else if (!emailIsValid(email)) {
        isMail.innerHTML = 'Định dạng email sai, vui lòng nhập lại'
        'vd: abc@gmail.com'
    } else {
        isMail.innerHTML = '';
    }

}