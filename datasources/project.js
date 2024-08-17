const { RESTDataSource } = require('apollo-datasource-rest');

class ProjectService extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000';
    }

    // initialize(conf) { //should remove because of the override the initialize method itself
    // }
    
    getProjects() {
        return this.get('/items').then((items) => {
            return items;
        }).catch((err) => console.log(err))
    }

    async getProjectById(id) {
        return await this.get(`/items/${id}`);
    }
}

module.exports = ProjectService;