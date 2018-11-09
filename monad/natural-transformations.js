const Box = x => ({
    map: f => Box(f(x)),        // 返回容器为了链式调用
    fold: f => f(x),            // 将元素从容器中取出
    inspect: () => `Box(${x})`, // 看容器里有啥
})

const b = Box(1)

console.log(b.map(x => x + 2))

console.log(b.fold(x => x * 2))

const boxToEither = b => b.fold(Right)
const boxToEither2 = b => b.fold(Left)

// Left(1) === Left(2)
boxToEither(b).map(f) === boxToEither(b.map(f))

// Box(1)

// 2
const two = zero
    .chain(either => either
        .fold(Task.rejected, Task.of) // Task(user)
        .chain(user => Db
            .find(user.bestFriendId) // Task(Either(user))
        )
        .chain(either => either
            .fold(Task.rejected, Task.of) // Task(user)
        )
    )

// 3

const three = zero
    .chain(either => either
        .fold(Task.rejected, Task.of) // Task(user)
    )
    .chain(user => Db
        .find(user.bestFriendId) // Task(Either(user))
    )
    .chain(either => either
        .fold(Task.rejected, Task.of) // Task(user)
    )


// either2Task

const either2Task = e => e.fold(Task.rejected, Task.of)

// zero :: Task(Either(user))
// findUser :: Task(Either(user))
// 4
const four = zero
    .chain(either2Task) // Task(user)
    .chain(user => findUser(user.friendId)) // Task(Either(user))
    .chain(either2Task) // Task(user2)
    .fork()

// Either IO
const eitherIO = e => e.of(IO.of)
