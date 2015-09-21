var faker = require('faker');
var fs = require('fs');

var numUsers = 200;
var numPosts = 2000;
var maxCommentsPerPost = 20;

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
		author: authors[faker.random.number(authors.length - 1)].id,
		title: faker.lorem.sentence(),
		content: faker.lorem.paragraphs(10)
	};
	posts.push(post);

	for (var j=0; j<faker.random.number(maxCommentsPerPost); j++) {
		var comment = {
			id: (i * numPosts) + j + 1,
			author: users[faker.random.number(users.length - 1)].id,
			post: post.id,
			text: faker.lorem.paragraphs()
		};
		comments.push(comment);
	}
}


var jsonApiData = {
	data: {
		id: 1,
		type: 'json-sync'
	},
	included: []
};


jsonApiData.included = jsonApiData.included.concat(
	users.map(function(user) {
		var postsForUser = posts.filter(function(post) {
			return post.author === user.id;
		});
		var commentsForUser = comments.filter(function(comment) {
			return comment.author === user.id;
		});
		return {
			type: 'json-user',
			id: user.id,
			attributes: {
				name: user.name,
				isAuthor: user.isAuthor
			},
			relationships: {
        posts: {
          data: postsForUser.map(function(post) {
            return {
              type: 'json-post',
              id: post.id
            }
          })
        },
        comments: {
          data: commentsForUser.map(function(comment) {
            return {
              type: 'json-comment',
              id: comment.id
            }
          })
        }
			}
		};
	}),
	posts.map(function(post) {
		var commentsForPost = comments.filter(function(comment) {
			return comment.post === post.id;
		});
		return {
			type: 'json-post',
			id: post.id,
			attributes: {
				title: post.title,
				content: post.content
			},
			relationships: {
        author: {
          data: {
            type: 'json-user',
            id: post.author
          }
        }
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
        author: {
          data: {
            type: 'json-user',
            id: comment.author
          }
        },
        post: {
          data: {
            type: 'json-post',
            id: comment.post
          }
        }
			}
		};
	})
);



fs.writeFileSync('public/blog-rest.json', JSON.stringify({
	user: users,
	post: posts,
	comment: comments
}, null, 2));



fs.writeFileSync('public/blog-json-api.json', JSON.stringify(jsonApiData, null, 2));

