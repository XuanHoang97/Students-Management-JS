function emailIsValid(email) {
    /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email)
}

function save() {
    let fullName = document.getElementById('fullName').value;
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

    let isFullName = document.getElementById('fullname--error');
    let isMail = document.getElementById('mail--error');
    let isPhone = document.getElementById('phone--error');
    let isAddr = document.getElementById('addr--error');
    let isGender = document.getElementById('gender--error');

    if (_.isEmpty(fullName)) {
        fullName = ''
        isFullName.innerHTML = 'Vui lòng nhập đầy đủ họ tên';
    } else if (fullName.trim().length <= 6) {
        fullName = ''
        isFullName.innerHTML = 'Họ và tên không được nhỏ hơn 6 ký tự';
    } else if (fullName.trim().length > 20) {
        fullName = ''
        isFullName.innerHTML = 'Không được nhâp lớn hơn 20 ký tự ';
    } else {
        isFullName.innerHTML = '';
    }

    // if (_.isEmpty(email)) {
    //     email = ''
    //     isMail.innerHTML = "Vui lòng nhập email";
    // } else if (!emailIsValid(email)) {
    //     email = ''
    //     isMail.innerHTML = 'Định dạng email sai, vui lòng nhập lại';

    // } else {
    //     isMail.innerHTML = '';
    // }

    if (_.isEmpty(phone)) {
        phone = '';
        isPhone.innerHTML = "Vui lòng nhập số điện thoại";
    } else if (phone.trim().length > 10) {
        phone = '';
        isPhone.innerHTML = 'Số điện thoại không được quá 10 số';

    } else {
        isPhone.innerHTML = '';
    }

    if (_.isEmpty(addr)) {
        addr = '';
        isAddr.innerHTML = "Vui lòng nhập địa chỉ";
    } else {
        isAddr.innerHTML = '';
    }

    if (_.isEmpty(gender)) {
        gender = '';
        isGender.innerHTML = "Vui lòng chọn giới tính";
    } else {
        isGender.innerHTML = '';
    }

    if (fullName && email && phone && addr && gender) {
        // Lưu vào trong danh sách sinh viên
        let students = [];
        students.push({
            fullName: fullName,
            email: email,
            phone: phone,
            addr: addr,
            gender: gender,
        });
        students.forEach((student, index) => {
            index++;
            tableContent = `<tr>
                    <td>${index}</td>
                    <td>${student.fullName}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.addr}</td>
                    <td>${student.gender}</td>
                    <td class="control">
                        <a href="#">Sửa</a>
                        <a href="#">Xoá</a>
                    </td>
                </tr>`;
        })
        document.getElementById('list--studens').innerHTML = tableContent;
    }

}