const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {

    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {


      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",

          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        expect(topic.title).toBe("Expeditions to Alpha Centauri");
        expect(topic.description).toBe("A compilation of reports from recent visits to the star system.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic object with missing title or description", (done) => {

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.title cannot be null");
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });
  });

  describe("#getPost()", () => {

    it("should add the post to a topic and return the posts", (done) => {

      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
        done();
      });

    });
  });
});
