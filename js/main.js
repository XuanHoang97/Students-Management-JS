    // Regex js
    let mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    // Validate
    function save() {
        let fullName = $('#fullName').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let addr = $('#addr').val();
        let gender = "";
        let pass = $('#password').val();
        let repass = $('#repassWord').val();

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
            isFullName = true;
        }

        // Validate email
        if (_.isEmpty(email)) {
            isMail.innerHTML = "Vui lòng nhập email";
        } else if (!email.match(mail)) {
            isMail.innerHTML = 'Định dạng email sai, vui lòng nhập lại';
        } else {
            isMail.innerHTML = '';
            isMail = true;
        }

        // Validate phone
        if (_.isEmpty(phone)) {
            isPhone.innerHTML = 'vui lòng nhập số điện thoại';
        } else if (!phone.match(vnf_regex)) {
            isPhone.innerHTML = "Sai định dạng số điện thoại";
        } else if (phone.trim().length > 11) {
            isPhone.innerHTML = 'Số điện thoại không được quá 11 số';
        } else {
            isPhone.innerHTML = '';
            isPhone = true;
        }

        // Validate address
        if (_.isEmpty(addr)) {
            addr = '';
            isAddr.innerHTML = "Vui lòng nhập địa chỉ";
        } else {
            isAddr.innerHTML = '';
            isAddr = true;
        }

        // Validate gender
        if (_.isEmpty(gender)) {
            gender = '';
            isGender.innerHTML = "Vui lòng chọn giới tính";
        } else {
            isGender.innerHTML = '';
            isGender = true;
        }

        // Validate password
        if (_.isEmpty(pass)) {
            isPass.innerHTML = "Vui lòng nhập mật khẩu";
        } else if (!password.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)) {
            isPass.innerHTML = 'Mật khẩu nhập vào phải chứa ít nhất một số và một chữ cái viết hoa và viết thường và ít nhất 8 ký tự trở lên ';
        } else {
            isPass.innerHTML = '';
            isPass = true;
        }

        // Validate repassword
        pass = document.getElementById('password');
        repass = document.getElementById('repassWord');
        if (_.isEmpty(repass)) {
            isRepass.innerHTML = "Vui lòng nhập mật khẩu";
        } else if (repass.value != pass.value) {
            isRepass.innerHTML = 'Mật khẩu không khớp';
        } else if (repass.value == pass.value) {
            isRepass.innerHTML = '';
            isRepass = true;
        }

        // CRUD Students
        if (fullName && email && phone && addr && gender && pass && repass) {
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
        } else if (!fullName || !email || !phone || !addr || !gender || !pass || !repass) {
            // code handle
        }
    }

    // Add students
    function renderListStudents() {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

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
                    <a href="#" onclick="edit(${studentsId})">Edit</a>
                    <a href="#" onclick="deleteStudents(${studentsId})">Delete</a>
                    <a href="#">Copy</a>
                </td>
            </tr>`;
        })
        document.getElementById('list--students').innerHTML = tableContent;

    }

    // Delete Students
    function deleteStudents(id, tableContent) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        // option delete 
        if (confirm('Xoá sinh viên: ' + students[id].fullName)) {
            students.splice(id, 1);

        } else {}

        localStorage.setItem('students', JSON.stringify(students));
        renderListStudents();

    }

    //reset value input
    function reset() {
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('addr').value = '';
        document.getElementById('password').value = '';
        document.getElementById('repassWord').value = '';
    }

    // Edit students
    function edit(index) {
        {
            let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

            document.getElementById('fullName').value = students.fullName;
            document.getElementById('email').value = students.email;
            document.getElementById('phone').value = students.phone;
            document.getElementById('addr').value = students.addr;

            localStorage.setItem('students', JSON.stringify(students));
            renderListStudents();

        }
    }

    //show pass
    var pw = document.getElementById('password');
    var pw2 = document.getElementById('repassWord');
    icon = document.querySelector('#eye');
    icon2 = document.querySelector('#eye--close');

    icon.onclick = function() {
        if (pw.className == 'active') {
            pw.setAttribute('type', 'text');
            icon.className = 'fa fa-eye';
            pw.className = '';

        } else {
            pw.setAttribute('type', 'password');
            icon.className = 'fa fa-eye-slash';
            pw.className = 'active';
        }

    }

    icon2.onclick = function() {
        if (pw2.className == 'active') {
            pw2.setAttribute('type', 'text');
            icon2.className = 'fa fa-eye';
            pw2.className = '';

        } else {
            pw2.setAttribute('type', 'password');
            icon2.className = 'fa fa-eye-slash';
            pw2.className = 'active';
        }

    }

    // Menu
    function Menu() {
        close = document.querySelector('#navmenu');
        const menu = document.querySelector(".navMenu");
        if (menu.style.display === "none") {
            menu.style.display = "grid";
            close.className = 'fas fa-times';
        } else {
            menu.style.display = "none";
            close.className = 'fas fa-bars';
        }

    }

    // Note Alert intro
    // setTimeout(function() { alert("Menu có thể kéo thả ra vị trí khác để dễ sử dụng hơn"); }, 15000);


    // feature extends
    $("#popOver").click(function(e) {
        $(".extend--feature").toggle();
        e.stopPropagation();
    });

    $(".extend--feature").click(function(e) {
        e.stopPropagation();
    });

    $(document).click(function() {
        $(".extend--feature").hide();
    });


    // Option data
    $(".setting").click(function(e) {
        $(".option").toggle();
        e.stopPropagation();
    });

    $(".option").click(function(e) {
        e.stopPropagation();
    });

    $(document).click(function() {
        $(".option").hide();
    });

    // Search
    $("#search").click(function() {
        alert('Chưa xử lý');
        document.getElementById('search--input').value = '';
    });

    // CRUD Courses
    var courseApi = "http://localhost:3000/courses";

    function start() {
        getCourses(renderCourses);
        handleCreateCourses()
    }

    start();
    // Lay khoa hoc
    function getCourses(callback) {
        fetch(courseApi)
            .then(function(response) {
                return response.json();
            })
            .then(callback);
    }

    function createCourses(data, callback) {
        var option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(courseApi, option)
            .then(function(response) {
                response.json;
            })
            .then(callback);
    }

    function handleDeleleCourse(id) {
        var option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(courseApi + "/" + id, option)
            .then(function(response) {
                response.json;
            })
            .then(function() {
                var courseItem = document.querySelector('.course-item-' + id);
                if (courseItem) {
                    courseItem.remove();
                }
            });
    }

    function renderCourses(courses) {
        var listCourses = document.querySelector("#test");
        var htmls = courses.map(function(course) {
            return `
                <div class="courses--item course-item-${course.id}">
                    <h4 class="course-name-${course.id}" >${course.name}</h4>
                    <p class="course-description-${course.id}">${course.description}</p>
                    <div class="control">
                        <i class="far fa-edit" onclick="handleUpdateCourses(${course.id})"></i>
                        <i class="far fa-window-close" onclick="handleDeleleCourse(${course.id})"></i>
                    </div>
                </div>
            `;
        })
        listCourses.innerHTML = htmls.join('');
    }

    function handleCreateCourses() {
        var createBtn = document.querySelector('#create');
        createBtn.onclick = function() {
            var name = document.querySelector('input[name="name"]').value;
            var description = document.querySelector('input[name="description"]').value;
            console.log(name, description)

            var formData = {
                name: name,
                description: description
            };
            createCourses(formData, function() {
                getCourses(renderCourses);
            });
        }
    }

    // UPDATE
    //trước đó tạo một button "Save" ngang hàng với button "Create"
    //button "Save" mặc định display: none
    function updateInput(id) {

        getCourses(function(course) {
            var x = course.find(course => course.id === id);
            document.querySelector('input[name="name"]').value = x.name;
            document.querySelector('input[name="description"]').value = x.description;
            document.querySelector('#create').style.display = "none"; //khi hàm chạy thì button "Create" sẽ ẩn
            document.querySelector('#update').style.display = 'block'; //khi hàm chạy thì button "Save" sẽ hiện để người dùng click

        });
    }

    function handleUpdateCourses(id) { //hàm này được call khi click vào nút "SỬA"
        updateInput(id); // hàm này để get data từ đã có để chỉnh sửa
        var updateBtn = document.querySelector('#update'); //hàm này được gọi khi click vào nút "Save"
        updateBtn.onclick = function() {
            var name = document.querySelector('input[name="name"]').value;
            var description = document.querySelector('input[name="description"]').value;
            var formData = {
                name: name,
                description: description
            }
            if (formData.name === "" || formData.description === '') {
                alert("Bạn cần nhập đầy đủ các trường thông tin!")
            } else {
                var options = {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
                fetch(courseApi + '/' + id, options)
                    .then(function(respond) {
                        respond.json()
                    })
            }


        }
    }