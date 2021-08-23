let accountList = [];

const initAccount = async () => {
    console.time('timer');
    accountList = await fetchList();
    const activeUserMap = await fetchActiveUsers(accountList);
    console.log(activeUserMap)
};

initAccount();

function fetchActiveUsers(users) {
    const accountActiveList = [];
    const iterator = users[Symbol.iterator]();
    iterator.next();

    return new Promise((resolve) => {
        users.forEach(async (id, idx) => {
            const isActive = await fetchOnline(id);
            accountActiveList[idx] = {isActive, id};

            const next = iterator.next();
            if(next.done) {
                resolve(accountActiveList);
                console.timeEnd('timer');
            }
        });
    })
}


function fetchList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['a', 'b', 'c']);
        }, 1000)
    })
}

function fetchOnline(id) {
    return new Promise((resolve) => {
        let time;
        switch (id) {
            case 'a':
                time = 2000;
                break;
            case 'b':
                time = 500;
                break;
            case 'c':
                time = 1000;
                break;
        }


        setTimeout(() => {
            resolve(true);
        }, time)
    })
}
