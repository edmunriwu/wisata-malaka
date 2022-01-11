var http = require('http');
const mariadb = require('mariadb');
var pug = require('pug');
var qs = require('querystring');
var NodeSession = require('node-session');
var url = require('url');
var fs = require('fs');
var formidable = require("formidable");
var path = require('path');
var md5

//lokasi
var mainUserPug = './templates/mainuser.pug';
var mainPug = './templates/main.pug';
var listPug1 = './templates/list1.pug';
var listPug2 = './templates/list2.pug';
var listPug3 = './templates/list3.pug';
var listPug4 = './templates/list4.pug';
var listPug5 = './templates/list5.pug';
var listPug6 = './templates/list6.pug';
var listPug11 = './templates/list11.pug';
var listPug12 = './templates/list12.pug';
var listPug13 = './templates/list13.pug';
var listPug14 = './templates/list14.pug';
var listPug15 = './templates/list15.pug';
var listPug16 = './templates/list16.pug';
var editFormPug1 = './templates/editForm1.pug';
var editFormPug2 = './templates/editForm2.pug';
var editFormPug3 = './templates/editForm3.pug';
var editFormPug4 = './templates/editForm4.pug';
var editFormPug5 = './templates/editForm5.pug';
var editFormPug6 = './templates/editForm6.pug';


//koneksi------------------------------------------
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'edmun',
    password: 'edmun',
    database: 'ow_malaka',
    connectionLimit: 100
});

var session = new NodeSession({
    secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
    lifetime: 300000,
    cookie: 'node_session',
    saveUninitialized: false,
    resave: false,
    expireOnClose: false
});

http.createServer(function(req, res) {
        if(req.url.endsWith(".gif") || req.url.endsWith(".jpg")|| req.url.endsWith(".png") || req.url.endsWith(".css") || req.url.endsWith(".jpeg")){
            fs.readFile(__dirname + req.url, function(err, data){
                if(err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
            return;
    
        }
        session.startSession(req, res, function () {
             if (req.url === '/') {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                async function mainhapus() {
                    let conn;
                    try {
                        let conn = await pool.getConnection();
                        let row = await conn.query("select * from objek_wisata_ow");
                        var template = pug.renderFile(mainUserPug, {
                            objek_wisata_ows: row
                        });
                        res.end(template);
                    } catch (err) {
                        console.log('Data Admin Gagal diseleksi');
                        throw err;
                    } finally {
                        if (conn) return conn.end();
                    }
                }
                mainhapus(); 
            } else if (req.url === '/login' && req.method === 'POST') {
                var body = '';
                req.on('data', function (data) {
                    body += data;
                });
                req.on('data', function () {
                    var form = qs.parse(body);
                    var params = [
                        form['user_id'],
                        form['user_password']
                    ];
                   
                    async function main() {
                        let conn;
                        try {
                            let conn = await pool.getConnection();
                            let rows = await conn.query(`
                            SELECT COUNT(*) AS cnt FROM users WHERE
                            user_id = '` + params[0] + `' AND user_password = '` + params[1] + `'`);
                            var n = rows[0]['cnt'];
                            console.log('Nilai n: ' + n);
                            if (n > 0) {
                               
                                req.session.put('user_id', params[0]);
                                
                                res.writeHead(302, {
                                    'Location': '/main'
                                });
                                res.end();
                            } else {
                                res.writeHead(200, {
                                    'Content-Type': 'text/html'
                                });
                                var template = pug.renderFile(loginFormPug, {
                                    msg: 'User ID atau Password salah'
                                });
                                res.end(template);
                            }
                        } catch (err) {
                            throw err;
                        } finally {
                            if (conn) return conn.end();
                        }
                    }
                    main();
    
                    //----------------------------------
                });
            } else if (req.url === '/main') {
                if (req.session.has('user_id')) { 
                    var user_id = req.session.get('user_id');
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    
                    var template = pug.renderFile(mainPug, {
                        user_id: user_id
                    });
                    res.end(template);
                } else { 
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    res.end();
                }
            }
            else if (req.url === '/list1') {
                async function main() {
                    let conn;
                    try {
                        let conn = await pool.getConnection();
                        let row = await conn.query("select * from admin");
                        if (req.session.has('user_id'));
                        var template = pug.renderFile(listPug1, {
                            admins: row
                        });
                        res.end(template);
                    } catch (err) {
                        console.log('Data Admin Gagal diseleksi');
                        throw err;
                    } finally {
                        if (req.session.has('user_id')) { 
                            var user_id = req.session.get('user_id');
                            res.writeHead(200, {
                                'Content-Type': 'text/html'
                            });
                        } else { 
                            res.writeHead(302, {
                                'Location': '/'
                            });
                            res.end();
                        }
                    }
                }
                main();
            } else if (req.url === '/add1') {
                switch (req.method) {
                    case 'GET':
                        var template = pug.renderFile(addFormPug1);
                        res.end(template);
                        break;
                    case 'POST':
                        var form = new formidable.IncomingForm();
                        form.parse(req, function (err, fields, files) {
                        const userfile = files.userfile;
                        const oldpath = userfile.filepath;
                        const ext = path.extname(userfile.originalFilename);
                        newGambarPath = userfile.newFilename + ext;
                        const newpath = path.join(__dirname, "./admingbr", newGambarPath);
                        fs.copyFile(oldpath, newpath, function (err) {
                            if (err) throw err;
                        });
                            var newRow = [
                                fields['id_admin'],
                                fields['nama'],
                                fields['alamat'],
                                fields['telepon'],
                                fields['email'],
                                fields['password'],
                                newGambarPath,
                            ];
                            async function main() {
                                let conn;
                                try {
                                let conn =await pool.getConnection();
                                const query =`INSERT INTO admin VALUES(?, ?, ?, ? , ? , ? , ?)`
                                let rows =await conn.query(query, newRow);
                                res.writeHead(302, {
                                    'Location': '/list1'
                                });
                                    res.end();
                                } catch (err) {
                                    console.log('Data admin gagal disimpan');
                                    throw err;
                                } finally {
                                    if (conn) return conn.end();
                                }
                            }
                            main();
                        });
                        break;
                }
            } else if (url.parse(req.url).pathname === '/edit1') {
                let newGambarPath;
                switch (req.method) {
                case 'GET':
                    var id = qs.parse(url.parse(req.url).query).id;
                    async function maintampil() {
                        let conn;
                        try {
                            let conn = await pool.getConnection();
                            let rows = await conn.query(`select * from admin where id_admin like '` + id + `'`);
                            var template = pug.renderFile(editFormPug1, {
                                admin: rows[0]
                            });
                            res.end(template);
                        } catch (err) {
                            throw err;
                        } finally {
                            if (conn) return conn.end();
                        }
                    }
                    maintampil();
                    break;
                    case "POST":
                        let newGambarPath;
                        var form = new formidable.IncomingForm();
                        form.parse(req, function (err, fields, files) {
                        const userfile = files.userfile;
                        const oldpath = userfile.filepath;
                        const ext = path.extname(userfile.originalFilename);
                        newGambarPath = userfile.newFilename + ext;
                        const newpath = path.join(__dirname, "./admingbr", newGambarPath);
                        fs.copyFile(oldpath, newpath, function (err)  {
                            if (err) throw err;
                        });
                        var newRow = [
                            nama = fields['nama'],
                            alamat = fields['alamat'],
                            telepon = fields['telepon'],
                            email = fields['email'],
                            password = fields['password'],
                            newGambarPath,
                            id = fields['id_admin'],
                        ];
                        async function main() {
                            let conn;
                            try {
                                let conn = await pool.getConnection();
                                const query = `UPDATE admin SET nama = '${nama}' , alamat ='${alamat}',telepon ='${telepon}', email ='${email}', password ='${password}' , gambar ='${newGambarPath}' 
                                WHERE id_admin LIKE '${id}'`
                                let rows = await conn.query(query, newRow);
                                res.writeHead(302, {
                                Location: "/list1",
                                });
                                res.end();
                            } catch (err) {
                                console.log("Data admin gagal disimpan");
                                throw err;
                            } finally {
                                if (conn) return conn.end();
                            }
                            }
                            main();
                        });    
                        break;
                    }
                }
         else if (url.parse(req.url).pathname === '/delete1') {
            //mengambil nilai dari parameter id
            var id = qs.parse(url.parse(req.url).query).id;
            async function mainhapus() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let rews = await conn.query(`
                    DELETE FROM admin WHERE id_admin like '` + id + `'`);
                    //kode untuk redirect ke root document
                    res.writeHead(302, {
                        'Location': '/list1'
                    });
                    res.end()
                } catch (err) {
                    throw err;
                } finally {
                    if (req.session.has('user_id')) { 
                        var user_id = req.session.get('user_id');
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                    } else { 
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    }
                }
            }
            mainhapus();
        }
        else if (req.url === '/list2') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from buku_tamu");
                    var template = pug.renderFile(listPug2, {
                        buku_tamus: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (req.session.has('user_id')) { 
                        var user_id = req.session.get('user_id');
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                    } else { 
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    }
                }
            }
            main(); 
        } else if (req.url === '/add2') {
            switch (req.method) {
                case 'GET':
                    var template = pug.renderFile(addFormPug2);
                    res.end(template);
                    break;
                case 'POST':
                    var body = '';
                    req.on('data',function (data) {
                        body += data;
                    });
                    req.on('end',function () {
                        var form = qs.parse(body);
                        var newRow = [
                            form['id_buku_tamu'],
                            form['tanggal'],
                            form['email'],
                            form['komentar']
                        ];
                        async function main() {
                            let conn;
                            try {
                                let conn = await pool.getConnection();
                                let rows = await conn.query(`INSERT INTO buku_tamu VALUES('` + newRow[0] + `','` + newRow[1] + `','` + newRow[2] + `',
                                '` + newRow[3] + `')
                                                    `);
                                res.writeHead(302, {
                                    'Location': '/list2'
                                });
                                res.end();                    
                            } catch (err) {
                                console.log('Data admin gagal disimpan');
                                throw err;
                            } finally {
                                if (conn) return conn.end();
                            }
                        }
                        main();
                    });
                    break;    
            }
        }else if (req.url === '/add12') {
            switch (req.method) {
                case 'GET':
                    var template = pug.renderFile(addFormPug2);
                    res.end(template);
                    break;
                case 'POST':
                    var body = '';
                    req.on('data',function (data) {
                        body += data;
                    });
                    req.on('end',function () {
                        var form = qs.parse(body);
                        var newRow = [
                            form['id_buku_tamu'],
                            form['tanggal'],
                            form['email'],
                            form['komentar']
                        ];
                        async function main() {
                            let conn;
                            try {
                                let conn = await pool.getConnection();
                                let rows = await conn.query(`INSERT INTO buku_tamu VALUES('` + newRow[0] + `','` + newRow[1] + `','` + newRow[2] + `',
                                '` + newRow[3] + `')
                                                    `);
                                res.writeHead(302, {
                                    'Location': '/list12'
                                });
                                res.end();                    
                            } catch (err) {
                                console.log('Data admin gagal disimpan');
                                throw err;
                            } finally {
                                if (conn) return conn.end();
                            }
                        }
                        main();
                    });
                    break;    
            }
        }  else if (url.parse(req.url).pathname === '/edit2') {
            switch (req.method) {
                case 'GET':
                    var id = qs.parse(url.parse(req.url).query).id;
                    async function maintampil() {
                        let conn;
                        try {
                            let conn = await pool.getConnection();
                            let rows = await conn.query(`select * from buku_tamu where id_buku_tamu like '` + id + `'`);
                            var template = pug.renderFile(editFormPug2, {
                                buku_tamu: rows[0]
                            });
                            res.end(template);
                        } catch (err) {
                            throw err;
                        } finally {
                            if (conn) return conn.end();
                        }
                    }
                    maintampil();
                    break;
                case 'POST':
                    var body = '';
                    req.on('data',function (data) {
                        body += data;
                    });
                    req.on('end', function () {
                        var form = qs.parse(body);
                        var params = [
                            form['tanggal'],
                            form['email'],
                            form['komentar'],
                            form['id_buku_tamu']
                        ]
                        async function main() {
                            let conn;
                            try{
                                let conn = await pool.getConnection();
                                let result = await conn.query(`
                                UPDATE buku_tamu 
                                SET 
                                    tanggal = '` + params[0] + `',
                                    email = '` + params[1] +  `',
                                    komentar = '` + params[2] + `'
                                    WHERE
                                    id_buku_tamu = '` + params[3] +`'`);
                                //kode untuk redirect ke root dokumen
                                res.writeHead(302, {
                                    'Location': '/list2'
                                });
                                res.end();    
                            } catch (err) {
                                throw err;
                            } finally {
                                if (conn) return conn.end();
                            }
                        }
                        main();
                    });
                    break;    
            }
        }  else if (url.parse(req.url).pathname === '/delete2') {
            //mengambil nilai dari parameter id
            var id = qs.parse(url.parse(req.url).query).id;
            async function mainhapus() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let rews = await conn.query(`
                    DELETE FROM buku_tamu WHERE id_buku_tamu like '` + id + `'`);
                    //kode untuk redirect ke root document
                    res.writeHead(302, {
                        'Location': '/list2'
                    });
                    res.end()
                } catch (err) {
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            mainhapus();
        } else if (req.url === '/list3') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from objek_wisata_ow");
                    var template = pug.renderFile(listPug3, {
                        objek_wisata_ows: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (req.session.has('user_id')) { 
                        var user_id = req.session.get('user_id');
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                    } else { 
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    }
                }
            }
            main(); 
        } else if (req.url === '/add3') {
            switch (req.method) {
                case 'GET':
                    var template = pug.renderFile(addFormPug3);
                    res.end(template);
                    break;
                case 'POST':
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                    const userfile = files.userfile;
                    const oldpath = userfile.filepath;
                    const ext = path.extname(userfile.originalFilename);
                    newGambarPath = userfile.newFilename + ext;
                    const newpath = path.join(__dirname, "./upload", newGambarPath);
                    fs.copyFile(oldpath, newpath, function (err) {
                        if (err) throw err;
                    });
                        var newRow = [
                            fields['id_ow'],
                            fields['nama_ow'],
                            fields['lokasi'],
                            fields['jam_operasi'],
                            fields['deskripsi_singkat'],
                            fields['tarif_masuk'],
                            newGambarPath,
                        ];
                        async function main() {
                            let conn;
                            try {
                                let conn =await pool.getConnection();
                            const query =`INSERT INTO objek_wisata_ow VALUES(?, ?, ?, ? , ? , ? , ?)`
                            let rows =await conn.query(query, newRow);
                            res.writeHead(302, {
                                'Location': '/list3'
                            });
                            res.end();                    
                            } catch (err) {
                                console.log('Data admin gagal disimpan');
                                throw err;
                            } finally {
                                if (conn) return conn.end();
                            }
                        }
                        main();
                    });
                    break;    
            }
        }  else if (url.parse(req.url).pathname ==='/edit3') {
            let newGambarPath;
            switch (req.method) {
                case 'GET':
                    var id = qs.parse(url.parse(req.url).query).id;
                    async function maintampil() {
                        let conn;
                        try {
                            let conn = await pool.getConnection();
                            let rows = await conn.query(`select * from objek_wisata_ow where id_ow like '` +id+ `'`);
                            var template = pug.renderFile(editFormPug3, {
                                objek_wisata_ow: rows[0]
                            });
                            res.end(template);
                        }catch (err) {
                            throw err;
                        } finally {
                            if (conn) return con.end();
                        }
                    }
                    maintampil();
                    break;
                case "POST":
                    let newGambarPath;
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                    const userfile = files.userfile;
                    const oldpath = userfile.filepath;
                    const ext = path.extname(userfile.originalFilename);
                    newGambarPath = userfile.newFilename + ext;
                    const newpath = path.join(__dirname, "./upload", newGambarPath);
                    fs.copyFile(oldpath, newpath, function (err)  {
                        if (err) throw err;
                    });
                    var newRow = [
                        nama = fields["nama_ow"],
                        lokasi = fields["lokasi"],
                        jam = fields["jam_operasi"],
                        deskripsi = fields["deskripsi_singkat"],
                        tarif = fields["tarif_masuk"],
                        newGambarPath,
                        id = fields["id_ow"],
                    ];
                    async function main() {
                    let conn;
                    try {
                        let conn = await pool.getConnection();
                        const query = `UPDATE objek_wisata_ow SET nama_ow = '${nama}' , lokasi ='${lokasi}',jam_operasi ='${jam}', deskripsi_singkat ='${deskripsi}', tarif_masuk ='${tarif}' , gambar ='${newGambarPath}' 
                        WHERE id_ow LIKE '${id}'`
                        let rows = await conn.query(query, newRow);
                        res.writeHead(302, {
                        Location: "/list3",
                        });
                        res.end();
                    } catch (err) {
                        console.log("Data Objek Wisata gagal disimpan");
                        throw err;
                    } finally {
                        if (conn) return conn.end();
                    }
                    }
                    main();
                });    
                break;
            }
        }

      else if (url.parse(req.url).pathname === '/delete3') {
            //mengambil nilai dari parameter id
            var id = qs.parse(url.parse(req.url).query).id;
            async function mainhapus() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let rews = await conn.query(`
                    DELETE FROM objek_wisata_ow WHERE id_ow like '` + id + `'`);
                    //kode untuk redirect ke root document
                    res.writeHead(302, {
                        'Location': '/list3'
                    });
                    res.end()
                } catch (err) {
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            mainhapus();
        }
        else if (req.url === '/list4') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from penginapan");
                    var template = pug.renderFile(listPug4, {
                        penginapans: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data penginapan Gagal diseleksi');
                    throw err;
                } finally {
                    if (req.session.has('user_id')) { 
                        var user_id = req.session.get('user_id');
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                    } else { 
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    }
                }
            }
            main();
        } else if (req.url === '/add4') {
        switch (req.method) {
            case 'GET':
                var template = pug.renderFile(addFormPug4);
                res.end(template);
                break;
            case 'POST':
                var form = new formidable.IncomingForm();
                        form.parse(req, function (err, fields, files) {
                        const userfile = files.userfile;
                        const oldpath = userfile.filepath;
                        const ext = path.extname(userfile.originalFilename);
                        newGambarPath = userfile.newFilename + ext;
                        const newpath = path.join(__dirname, "./penginapgbr", newGambarPath);
                        fs.copyFile(oldpath, newpath, function (err) {
                            if (err) throw err;
                });
                    var newRow = [
                        fields['id_penginapan'],
                        fields['nama_penginapan'],
                        fields['lokasi_penginapan'],
                        fields['biaya'],
                        fields['telepon'],
                        fields['email'],
                        fields['jam'],
                        newGambarPath,
                    ];
                    async function main() {
                        let conn;
                        try {
                            let conn =await pool.getConnection();
                                const query =`INSERT INTO penginapan VALUES(?, ?, ?, ? , ? , ? , ?, ?)`
                                let rows =await conn.query(query, newRow);
                                res.writeHead(302, {
                                'Location': '/list4'
                            });
                            res.end();
                        } catch (err) {
                            console.log('Data penginapan gagal disimpan');
                            throw err;
                        } finally {
                            if (conn) return conn.end();
                        }
                    }
                    main();
                });
                break;
        }
    } else if (url.parse(req.url).pathname === '/edit4') {
        let newGambarPath;
        switch (req.method) {
            case 'GET':
                var id = qs.parse(url.parse(req.url).query).id;
                async function maintampil() {
                    let conn;
                    try {
                        let conn = await pool.getConnection();
                        let rows = await conn.query(`select * from penginapan where id_penginapan like '` + id + `'`);
                        var template = pug.renderFile(editFormPug4, {
                            penginapan: rows[0]
                        });
                        res.end(template);
                    } catch (err) {
                        throw err;
                    } finally {
                        if (conn) return conn.end();
                    }
                }
                maintampil();
                break;
            case 'POST':
                let newGambarPath;
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                    const userfile = files.userfile;
                    const oldpath = userfile.filepath;
                    const ext = path.extname(userfile.originalFilename);
                    newGambarPath = userfile.newFilename + ext;
                    const newpath = path.join(__dirname, "./penginapgbr", newGambarPath);
                    fs.copyFile(oldpath, newpath, function (err)  {
                        if (err) throw err;
                    });
                    var newRow = [
                        nama = fields['nama_penginapan'],
                        lokasi = fields['lokasi_penginapan'],
                        biaya = fields['biaya'],
                        telepon = fields['telepon'],
                        email = fields['email'],
                        jam = fields['jam'],
                        newGambarPath,
                        id = fields['id_penginapan'],
                    ];
                    async function main() {
                        let conn;
                        try {
                            let conn = await pool.getConnection();
                            const query = `UPDATE penginapan SET nama_penginapan = '${nama}' , lokasi_penginapan ='${lokasi}',biaya ='${biaya}', telepon='${telepon}', email ='${email}' , jam ='${jam}' , gambar ='${newGambarPath}' 
                            WHERE id_penginapan LIKE '${id}'`
                            let rows = await conn.query(query, newRow);
                            res.writeHead(302, {
                            Location: "/list4",
                            });
                            res.end();
                        } catch (err) {
                            throw err;
                        } finally {
                            if (conn) return conn.end();
                        }
                    }
                    main();
                });
                break;
        }
    } else if (url.parse(req.url).pathname === '/delete4') {
        //mengambil nilai dari parameter id
        var id = qs.parse(url.parse(req.url).query).id;
        async function mainhapus() {
            let conn;
            try {
                let conn = await pool.getConnection();
                let rews = await conn.query(`
                DELETE FROM penginapan WHERE id_penginapan like '` + id + `'`);
                //kode untuk redirect ke root document
                res.writeHead(302, {
                    'Location': '/list4'
                });
                res.end()
            } catch (err) {
                throw err;
            } finally {
                if (conn) return conn.end();
            }
        }
        mainhapus();
    }
    else if (req.url === '/list5') {
        async function main() {
            let conn;
            try {
                let conn = await pool.getConnection();
                let row = await conn.query("select * from restoran");
                var template = pug.renderFile(listPug5, {
                    restorans: row
                });
                res.end(template);
            } catch (err) {
                console.log('Data Admin Gagal diseleksi');
                throw err;
            } finally {
                if (req.session.has('user_id')) { 
                    var user_id = req.session.get('user_id');
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                } else { 
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    res.end();
                }
            }
        }
        main();
    } else if (req.url === '/add5') {
    switch (req.method) {
        case 'GET':
            var template = pug.renderFile(addFormPug5);
            res.end(template);
            break;
        case 'POST':
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
            const userfile = files.userfile;
            const oldpath = userfile.filepath;
            const ext = path.extname(userfile.originalFilename);
            newGambarPath = userfile.newFilename + ext;
            const newpath = path.join(__dirname, "./restogbr", newGambarPath);
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
            });
                var newRow = [
                    fields['id_restoran'],
                    fields['nama_restoran'],
                    fields['lokasi_restoran'],
                    fields['telepon'],
                    fields['email'],
                    fields['jam'],
                    newGambarPath,
                ];
                async function main() {
                    let conn;
                    try {
                        let conn =await pool.getConnection();
                                const query =`INSERT INTO restoran VALUES(?, ?, ?, ? , ? , ? , ?)`
                                let rows =await conn.query(query, newRow);
                                res.writeHead(302, {
                            'Location': '/list5'
                        });
                        res.end();
                    } catch (err) {
                        console.log('Data penginapan gagal disimpan');
                        throw err;
                    } finally {
                        if (conn) return conn.end();
                    }
                }
                main();
            });
            break;
    }
} else if (url.parse(req.url).pathname === '/edit5') {
    let newGambarPath;
    switch (req.method) {
        case 'GET':
            var id = qs.parse(url.parse(req.url).query).id;
            async function maintampil() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let rows = await conn.query(`select * from restoran where id_restoran like '` + id + `'`);
                    var template = pug.renderFile(editFormPug5, {
                        restoran: rows[0]
                    });
                    res.end(template);
                } catch (err) {
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            maintampil();
            break;
        case 'POST':
            let newGambarPath;
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                    const userfile = files.userfile;
                    const oldpath = userfile.filepath;
                    const ext = path.extname(userfile.originalFilename);
                    newGambarPath = userfile.newFilename + ext;
                    const newpath = path.join(__dirname, "./restogbr", newGambarPath);
                    fs.copyFile(oldpath, newpath, function (err)  {
                        if (err) throw err;
                    });
                var newRow = [
                    nama = fields['nama_restoran'],
                    lokasi = fields['lokasi_restoran'],
                    telepon = fields['telepon'],
                    email = fields['email'],
                    jam = fields['jam'],
                    newGambarPath,
                    id = fields['id_restoran'],
                ];
                async function main() {
                    let conn;
                    try {
                        let conn = await pool.getConnection();
                        const query = `UPDATE restoran SET nama_restoran = '${nama}' , lokasi_restoran ='${lokasi}',telepon ='${telepon}', email ='${email}', jam ='${jam}' , gambar ='${newGambarPath}' 
                        WHERE id_restoran LIKE '${id}'`
                        let rows = await conn.query(query, newRow);
                        res.writeHead(302, {
                        Location: "/list5",
                        });
                        res.end();
                    } catch (err) {
                        throw err;
                    } finally {
                        if (conn) return conn.end();
                    }
                }
                main();
            });
            break;
    }
} else if (url.parse(req.url).pathname === '/delete5') {
    //mengambil nilai dari parameter id
    var id = qs.parse(url.parse(req.url).query).id;
    async function mainhapus() {
        let conn;
        try {
            let conn = await pool.getConnection();
            let rews = await conn.query(`
            DELETE FROM restoran WHERE id_restoran like '` + id + `'`);
            //kode untuk redirect ke root document
            res.writeHead(302, {
                'Location': '/list5'
            });
            res.end()
        } catch (err) {
            throw err;
        } finally {
            if (conn) return conn.end();
        }
    }
    mainhapus();
}
else if (req.url === '/list6') {
    async function main() {
        let conn;
        try {
            let conn = await pool.getConnection();
            let row = await conn.query("select * from testimoni");
            var template = pug.renderFile(listPug6, {
                testimonis: row
            });
            res.end(template);
        } catch (err) {
            console.log('Data Admin Gagal diseleksi');
            throw err;
        } finally {
            if (req.session.has('user_id')) { 
                var user_id = req.session.get('user_id');
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
            } else { 
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            }
        }
    }
    main();
} else if (req.url === '/add6') {
switch (req.method) {
    case 'GET':
        var template = pug.renderFile(addFormPug6);
        res.end(template);
        break;
    case 'POST':
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
        const userfile = files.userfile;
        const oldpath = userfile.filepath;
        const ext = path.extname(userfile.originalFilename);
        newGambarPath = userfile.newFilename + ext;
        const newpath = path.join(__dirname, "./testigbr", newGambarPath);
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) throw err;
        });
            var newRow = [
                fields['id_testimoni'],
                fields['nama'],
                fields['email'],
                fields['tanggal_posting'],
                fields['testimoni'],
                newGambarPath,
            ];
            async function main() {
                let conn;
                try {
                    let conn =await pool.getConnection();
                    const query =`INSERT INTO testimoni VALUES(?, ?, ? , ? , ? , ?)`
                    let rows =await conn.query(query, newRow);
                    res.writeHead(302, {
                        'Location': '/list6'
                    });
                    res.end();
                } catch (err) {
                    console.log('Data penginapan gagal disimpan');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            main();
        });
        break;
}
}else if (req.url === '/add16') {
    switch (req.method) {
        case 'GET':
            var template = pug.renderFile(addFormPug6);
            res.end(template);
            break;
        case 'POST':
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
            const userfile = files.userfile;
            const oldpath = userfile.filepath;
            const ext = path.extname(userfile.originalFilename);
            newGambarPath = userfile.newFilename + ext;
            const newpath = path.join(__dirname, "./testigbr", newGambarPath);
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
            });
                var newRow = [
                    fields['id_testimoni'],
                    fields['nama'],
                    fields['email'],
                    fields['tanggal_posting'],
                    fields['testimoni'],
                    newGambarPath,
                ];
                async function main() {
                    let conn;
                    try {
                        let conn =await pool.getConnection();
                        const query =`INSERT INTO testimoni VALUES(?, ?, ? , ? , ? , ?)`
                        let rows =await conn.query(query, newRow);
                        res.writeHead(302, {
                            'Location': '/list16'
                        });
                        res.end();
                    } catch (err) {
                        console.log('Data penginapan gagal disimpan');
                        throw err;
                    } finally {
                        if (conn) return conn.end();
                    }
                }
                main();
            });
            break;
    }
    }else if (url.parse(req.url).pathname ==='/edit6') {
        let newGambarPath;
        switch (req.method) {
            case 'GET':
                var id = qs.parse(url.parse(req.url).query).id;
                async function maintampil() {
                    let conn;
                    try {
                        let conn = await pool.getConnection();
                        let rows = await conn.query(`select * from testimoni where id_testimoni like '` +id+ `'`);
                        var template = pug.renderFile(editFormPug6, {
                            testimoni: rows[0]
                        });
                        res.end(template);
                    }catch (err) {
                        throw err;
                    } finally {
                        if (conn) return con.end();
                    }
                }
                maintampil();
                break;
            case "POST":
                let newGambarPath;
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                const userfile = files.userfile;
                const oldpath = userfile.filepath;
                const ext = path.extname(userfile.originalFilename);
                newGambarPath = userfile.newFilename + ext;
                const newpath = path.join(__dirname, "./testigbr", newGambarPath);
                fs.copyFile(oldpath, newpath, function (err)  {
                    if (err) throw err;
                });
                var newRow = [
                    nama = fields["nama"],
                    email = fields["email"],
                    tanggal = fields["tanggal_posting"],
                    testimoni = fields["testimoni"],
                    newGambarPath,
                    id = fields["id_testimoni"],
                ];
                async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    const query = `UPDATE testimoni SET nama_ow = '${nama}' , email ='${email}',tanggal_posting ='${tanggal}', testimoni ='${testimoni}', gambar ='${newGambarPath}' 
                    WHERE id_testimoni LIKE '${id}'`
                    let rows = await conn.query(query, newRow);
                    res.writeHead(302, {
                    Location: "/list6",
                    });
                    res.end();
                } catch (err) {
                    console.log("Data Objek Wisata gagal disimpan");
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
                }
                main();
            });    
            break;
        }


} else if (url.parse(req.url).pathname === '/delete6') {
//mengambil nilai dari parameter id
var id = qs.parse(url.parse(req.url).query).id;
async function mainhapus() {
    let conn;
    try {
        let conn = await pool.getConnection();
        let rews = await conn.query(`
        DELETE FROM testimoni WHERE id_testimoni like '` + id + `'`);
        //kode untuk redirect ke root document
        res.writeHead(302, {
            'Location': '/list6'
        });
        res.end()
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}
mainhapus();
}
        else if (req.url === '/list11') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from admin");
                    var template = pug.renderFile(listPug11, {
                        admins: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            main();
        } 
        else if (req.url === '/list12') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from buku_tamu");
                    var template = pug.renderFile(listPug12, {
                        buku_tamus: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            main(); 
        }    else if (req.url === '/list13') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from objek_wisata_ow");
                    var template = pug.renderFile(listPug13, {
                        objek_wisata_ows: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            main(); 
        }   else if (req.url === '/list14') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from penginapan");
                    var template = pug.renderFile(listPug14, {
                        penginapans: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            main();
        }   else if (req.url === '/list15') {
            async function main() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from restoran");
                    var template = pug.renderFile(listPug15, {
                        restorans: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            main();
        }   else if (req.url === '/list16') {
            async function mainhapus() {
                let conn;
                try {
                    let conn = await pool.getConnection();
                    let row = await conn.query("select * from testimoni");
                    var template = pug.renderFile(listPug16, {
                        testimonis: row
                    });
                    res.end(template);
                } catch (err) {
                    console.log('Data Admin Gagal diseleksi');
                    throw err;
                } finally {
                    if (conn) return conn.end();
                }
            }
            mainhapus();
        }
        else if (req.url == '/logout') {
            if (req.session.has('user_id')) {
                req.session.forget('user_id'); 
            }
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end('Halaman tidak ditemukan');
        }

    });
}).listen(5000);