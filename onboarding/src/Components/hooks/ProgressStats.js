/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from "react";
import {getPath} from "../utils";

function ProgressStats(){

}

/*
 * Helper to input new packageId into object of relation employees - packages;
 * assumption: {userId: , packageIds: new Set() }.
 * ToFix: computational complexity O(n^2);
 */
function assignPackageToUsers(usersPackages, packageObject){
    if(!packageObject.hasOwnProperty("users"))
        return;

    let i, j, users = packageObject.users, count = packageObject.users.length;
    var newElement;

    for(i = 0; i < count; i++){

        for(j = usersPackages.length - 1; j >= 0; j--)
            if(usersPackages[j].userId === users[i])
                break;
        if(j >= 0)
            usersPackages[j].packageIds.add(packageObject.id);
        else {
            newElement = {userId: users[i], packageIds: new Set()};
            newElement.packageIds.add(packageObject.id);
            usersPackages.push(newElement);
        }
    }
}

/**
 * Get list of users and their packages;
 */
export function usersWithPackages(props){
    const [usersForPackages, setUsersForPackages] = useState([]);
    let url = getPath(),
        fetchProps = {
            method: "GET", headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": "",
            }
        };

    useEffect(() => {
        fetch(url + "api/package/list_by_company_hr/", fetchProps).then((res) => res.json()).then(
            (result) => {
                if(Array.isArray(result)){
                    let users4Packages = [], packageIds;
                    let i, count = result.length;

                    for(i = 0; i < count; i++){
                        assignPackageToUsers(users4Packages, result[i]);
                    }

                    for(i = users4Packages.length - 1; i >= 0; i--){
                        packageIds = [];
                        users4Packages[i].packageIds.forEach(v => packageIds.push(v));// convert set to array;
                        users4Packages[i].packageIds = packageIds;
                    }

                    setUsersForPackages(users4Packages);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [props.count]);

    return usersForPackages;
}

/**
 * Get packages of user by user's id
 */
export function userWithPackages(id, count){
    const users = usersWithPackages(count);
    return users.find(user => user.userId == id);
}

export default ProgressStats;
