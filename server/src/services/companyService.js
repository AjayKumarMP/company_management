import Company from '../models/company.js';

export const getAllCompany = async () => {
    return await Company.findAll();
}

export const createCompany = async (company) => {
    const result = await Company.create(company);
    return result;
}

export const updateCompany = async (company) => {
    const result = await Company.update(company, {
        where: {
            id: company.id
        }
    })
    return result;
}

export const deleteCompany = async({id}) => {
    return await Company.destroy({
        where: {
            id
        }
    })
}