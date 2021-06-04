    let mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    // Validate
    function save() {
        let fullName = $('#fullName').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let addr = $('#addr').val();
        let gender = "";
        let pass = $('#password').val();
        let repass = $('#repassword').val();

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
        let isPass = document.getElementById('pass--error');
        let isRepass = document.getElementById('repass--error');

        // Validate fullname
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

        // Validate email
        if (_.isEmpty(email)) {
            isMail.innerHTML = "Vui lòng nhập email";
        } else if (!mail.test(email)) {
            isMail.innerHTML = 'Định dạng email sai, vui lòng nhập lại';
        } else {
            isMail.innerHTML = '';
        }

        // Validate phone
        if (_.isEmpty(phone)) {
            isPhone.innerHTML = 'vui lòng nhập số điện thoại';
        } else if (!vnf_regex.test(phone)) {
            isPhone.innerHTML = "Sai định dạng số điện thoại";
        } else if (phone.trim().length > 11) {
            phone = '';
            isPhone.innerHTML = 'Số điện thoại không được quá 11 số';
        } else {
            isPhone.innerHTML = '';
        }

        // Validate address
        if (_.isEmpty(addr)) {
            addr = '';
            isAddr.innerHTML = "Vui lòng nhập địa chỉ";
        } else {
            isAddr.innerHTML = '';
        }

        // Validate gender
        if (_.isEmpty(gender)) {
            gender = '';
            isGender.innerHTML = "Vui lòng chọn giới tính";
        } else {
            isGender.innerHTML = '';
        }

        // Validate password
        if (_.isEmpty(pass)) {
            isPass.innerHTML = "Vui lòng nhập mật khẩu";
        } else {
            isPass.innerHTML = '';
        }

        // Validate repassword
        if (_.isEmpty(repass)) {
            isRepass.innerHTML = "Vui lòng Nhập mật khẩu";
        } else {
            isRepass.innerHTML = '';
        }

        // CRUD Students
        if (fullName && email && phone && addr && gender) {
            // Thêm ds sinh viên
            let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

            students.push({
                fullName: fullName,
                email: email,
                phone: phone,
                addr: addr,
                gender: gender,
            });

            localStorage.setItem('students', JSON.stringify(students));
            this.renderListStudents();
        }
    }

    // Add students
    function renderListStudents() {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        // Check show/hidden list--students
        // if (students.length === 0) {
        //     document.getElementById('list--students').style.display = 'none';
        //     return false;
        // }
        // document.getElementById('list--students').style.display = 'block';

        tableContent = `
        <tr class="info">
            <th>#</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Action</th>
        </tr>`;

        students.forEach((students, index) => {
            let studentsId = index;

            index++;
            tableContent += `<tr>
                <td>${index}</td>
                <td>${students.fullName}</td>
                <td>${students.email}</td>
                <td>${students.phone}</td>
                <td>${students.addr}</td>
                <td>${students.gender}</td>
                <td class="control">
                    <a href="#" >Sửa</a>
                    <a href="#" onclick="deleteStudents(${studentsId})">Xoá</a>
                </td>
            </tr>`;
        })
        document.getElementById('list--students').innerHTML = tableContent;

    }

    // Delete Students
    function deleteStudents(id, tableContent) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        alert('Đã xoá sinh viên' + students.fullName)
        students.splice('id', 1);

        localStorage.setItem('students', JSON.stringify(students));
        renderListStudents();

    }