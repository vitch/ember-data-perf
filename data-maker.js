var faker = require('faker');
var fs = require('fs');

var numUsers = 100;
var numPosts = 1000;
var maxCommentsPerPost = 10;

users = [];
authors = [];
posts = [];
comments = [];

for (var i=0; i<numUsers; i++) {
	var user = {
		id: i + 1,
		name: faker.name.findName(),
		isAuthor: Math.random() > .7
	};
	users.push(user);
	if (user.isAuthor) {
		authors.push(user);
	}
}

if (authors.length === 0) {
	users[0].isAuthor = true;
	authors.push(users[0]);
}

for (var i=0; i<numPosts; i++) {
	var post = {
		id: i + 1,
		authorId: authors[faker.random.number(authors.length - 1)].id,
		title: faker.lorem.sentence(),
		content: faker.lorem.paragraphs(10)
	};
	posts.push(post);

	for (var j=0; j<faker.random.number(maxCommentsPerPost); j++) {
		var comment = {
			id: (i * numPosts) + j + 1,
			authorId: users[faker.random.number(users.length - 1)].id,
			postId: post.id,
			text: faker.lorem.paragraphs()
		};
		comments.push(comment);
	}
}


var jsonApiData = {
	data: {
		id: 1,
		type: 'sync'
	},
	included: []
};


jsonApiData.included = jsonApiData.included.concat(
	users.map(function(user) {
		var postsForUser = posts.filter(function(post) {
			return post.authorId === user.id;
		});
		var commentsForUser = comments.filter(function(comment) {
			return comment.authorId === user.id;
		});
		return {
			type: 'json-user',
			id: user.id,
			attributes: {
				name: user.name,
				isAuthor: user.isAuthor
			},
			relationships: {
				posts: postsForUser.map(function(post) {
					return {
						data: {
							type: 'json-post',
							id: post.id
						}
					}
				}),
				comments: commentsForUser.map(function(comment) {
					return {
						data: {
							type: 'json-comment',
							id: comment.id
						}
					}
				})
			}
		};
	}),
	posts.map(function(post) {
		var commentsForPost = comments.filter(function(comment) {
			return comment.postId === post.id;
		});
		return {
			type: 'json-post',
			id: post.id,
			attributes: {
				title: post.title,
				content: post.content
			},
			relationships: {
				comments: commentsForPost.map(function(comment) {
					return {
						data: {
							type: 'json-comment',
							id: comment.id
						}
					}
				})
			}
		};
	}),
	comments.map(function(comment) {
		return {
			type: 'json-comment',
			id: comment.id,
			attributes: {
				text: comment.text,
			},
			relationships: {
			}
		};
	})
);



fs.writeFileSync('public/blog-rest.json', JSON.stringify({
	users: users,
	posts: posts,
	comments: comments
}, null, 2));



fs.writeFileSync('public/blog-json-api.json', JSON.stringify(jsonApiData, null, 2));

