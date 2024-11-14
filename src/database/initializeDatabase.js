export async function initializeDatabase(database) {
  try {
    await database.execAsync(`
        DROP TABLE IF EXISTS payments;

        DROP TABLE IF EXISTS users;

        DROP TABLE IF EXISTS idx_users_nome;

        DROP TABLE IF EXISTS idx_payments_data_pagamento;

        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            curso TEXT,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL DEFAULT 'A123456a!',
            role TEXT NOT NULL DEFAULT 'USER',
            created_at DATE DEFAULT CURRENT_TIMESTAMP,
            updated_at DATE
        );

        CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        user_cadastro INTEGER NOT NULL,
        valor_pago REAL NOT NULL,
        data_pagamento DATE NOT NULL,
        numero_recibo TEXT NOT NULL,
        observacao TEXT,
        created_at DATE DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (user_cadastro) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        descricao TEXT,
        capa BLOB,  -- Tipo para armazenar imagem da capa em formato binário ou URL se estiver em um servidor
        usuario_id INTEGER, -- Relacionamento com o id do usuário que adicionou o livro
        status_leitura TEXT CHECK (status_leitura IN ('A Ler', 'Lendo', 'Lido', 'Favorito')),
        created_at DATE DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE,
        FOREIGN KEY (usuario_id) REFERENCES users(id)
    );

        CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);

        CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments (data_pagamento);

        INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('SUPER', 'super@email.com', 'A123456a!', 'SUPER');
        INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('ADMIN', 'admin@email.com', 'A123456a!', 'ADMIN');
        INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('USER', 'user@email.com', 'A123456a!', 'USER');


        insert into users (nome, curso, email, role) values ('Harper Boolsen', 'Agropecuária', 'hboolsen0@about.me', 'USER');
        insert into users (nome, curso, email, role) values ('Jerad Hurst', 'Informática', 'jhurst1@hexun.com', 'SUPER');
        insert into users (nome, curso, email, role) values ('Dollie Simnell', 'Informática', 'dsimnell2@bigcartel.com', 'SUPER');
        insert into users (nome, curso, email, role) values ('Monique Ambrosch', 'Informática', 'mambrosch3@epa.gov', 'ADMIN');
        insert into users (nome, curso, email, role) values ('Artemus Tomaszkiewicz', 'Agropecuária', 'atomaszkiewicz4@ow.ly', 'SUPER');
        insert into users (nome, curso, email, role) values ('Penni Reddecliffe', 'Informática', 'preddecliffe5@hhs.gov', 'ADMIN');
        insert into users (nome, curso, email, role) values ('Leupold Fawkes', 'Adminitração', 'lfawkes6@java.com', 'SUPER');
        insert into users (nome, curso, email, role) values ('Lin Sancraft', 'Agropecuária', 'lsancraft7@godaddy.com', 'SUPER');
        insert into users (nome, curso, email, role) values ('Ad Swaffield', 'Adminitração', 'aswaffield8@aol.com', 'USER');
        insert into users (nome, curso, email, role) values ('Reuven Heindrick', 'Agropecuária', 'rheindrick9@deliciousdays.com', 'USER');
        insert into users (nome, curso, email, role) values ('Carlen Lowndsbrough', 'Informática', 'clowndsbrougha@globo.com', 'ADMIN');
        insert into users (nome, curso, email, role) values ('Phillida Truelock', 'Bio', 'ptruelockb@boston.com', 'USER');
        insert into users (nome, curso, email, role) values ('Catharina Bau', 'Adminitração', 'cbauc@mail.ru', 'ADMIN');
        insert into users (nome, curso, email, role) values ('See Streetfield', 'Agropecuária', 'sstreetfieldd@dot.gov', 'ADMIN');
        insert into users (nome, curso, email, role) values ('Niel Fiddian', 'Agropecuária', 'nfiddiane@patch.com', 'SUPER');
        insert into users (nome, curso, email, role) values ('Cletis Micco', 'Informática', 'cmiccof@noaa.gov', 'SUPER');
        insert into users (nome, curso, email, role) values ('Julie Frizell', 'Agropecuária', 'jfrizellg@hao123.com', 'ADMIN');
        insert into users (nome, curso, email, role) values ('Karin Francesc', 'Agropecuária', 'kfrancesch@google.es', 'SUPER');
        insert into users (nome, curso, email, role) values ('Tandi Mulgrew', 'Bio', 'tmulgrewi@kickstarter.com', 'USER');
        insert into users (nome, curso, email, role) values ('Cassius Amphlett', 'Bio', 'camphlettj@wikispaces.com', 'USER');
        insert into users (nome, curso, email, role) values ('Gwyn Banting', 'Informática', 'gbantingk@plala.or.jp', 'SUPER');
        insert into users (nome, curso, email, role) values ('Wolfie McKeon', 'Bio', 'wmckeonl@canalblog.com', 'USER');
        insert into users (nome, curso, email, role) values ('Kennith Jopp', 'Agropecuária', 'kjoppm@hugedomains.com', 'SUPER');
        insert into users (nome, curso, email, role) values ('Moishe O''Heyne', 'Adminitração', 'moheynen@twitter.com', 'ADMIN');
        insert into users (nome, curso, email, role) values ('Benji Lemerie', 'Bio', 'blemerieo@ox.ac.uk', 'USER');
        `);
  } catch (error) {
    console.log(error);
  }
}
