import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebaseConfig";
import { useLoading } from "../hooks/useLoading";
import useMounted from "../hooks/useMounted";
import { useTheme } from "../hooks/useTheme";
import { useDoc } from "../hooks/useDoc";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../hooks/useModal";
import AuthModal from "./AuthModal";
import DummyContent from "./DummyContent";
import LoginAlertModal from "./LoginAlertModal";
import "./css/Recipecook.css";
import ConfirmationAlert from "./ConfirmationAlert";

const Recipecook = () => {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { mode } = useTheme();
  const { currentUser } = useAuth();
  const { setContentIsReady } = useLoading();
  const navigate = useNavigate();
  const { recipeid } = useParams();
  const { document: recipe } = useDoc("recipe_list", recipeid);
  const [remountCount, setRemountCount] = useState(0);
  const mountedStatus = useMounted();
  const [displayName, setDisplayName] = useState("");
  const { openModal, setOpenModal, setModalContent } = useModal();
  const [editRecipe, setEditRecipe] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (mountedStatus.current) setRemountCount(1);
    }, 500);
  }, [setRemountCount, mountedStatus]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    async function helperName() {
      if (recipe.createdTime.seconds === recipe.lastEditedTime.seconds) {
        const docSnap = await getDoc(doc(db, "users", recipe.authorUid));
        setDisplayName(docSnap.data().userName.split(" ")[0]);
      } else {
        const docSnap = await getDoc(doc(db, "users", recipe.editedAuthorUid));
        setDisplayName(docSnap.data().userName.split(" ")[0]);
      }
    }
    if (recipe) helperName();
  }, [recipe]);

  useEffect(() => {
    if (remountCount === 1 && recipe === null) setContentIsReady(false);
    else if (recipe) setContentIsReady(true);
  }, [recipe, setContentIsReady, remountCount]);

  useEffect(() => {
    if (editRecipe) navigate(`/createrecipe/${recipeid}`, { state: recipe });
  }, [editRecipe, recipeid, recipe, navigate]);

  async function edit() {
    try {
      if (!currentUser) {
        setModalContent(<LoginAlertModal />);
        return setOpenModal(!openModal);
      }
      const docSnap = await getDoc(doc(db, "users", currentUser.uid));
      const userData = docSnap.data();
      if (recipe.authorUid === currentUser.uid || userData.role === "admin") {
        setModalContent(
          <ConfirmationAlert
            message="Are you sure you want to edit recipe ?"
            setEditRecipe={setEditRecipe}
          />
        );
        setOpenModal(true);
      } else {
        setModalContent(
          <AuthModal message="You can only edit your own recipe." />
        );
        setOpenModal(!openModal);
      }
    } catch (err) {
      alert("Failed to edit recipe!", err.message);
    }
  }
  const addLinebreaks = (anyString) => {
    return anyString.replaceAll("\n", "<br/>");
  };

  const textToBulletPoint = (inputString) => {
    const stringArray = addLinebreaks(inputString).split("<br/>");
    if (stringArray.length === 1) return <p>{inputString}</p>;
    return (
      <ol className="recipeMethodList">
        {stringArray.map((element, index) => (
          <li key={index}>{element.slice(2).trim()}</li>
        ))}
      </ol>
    );
  };

  return recipe ? (
    <div className="foodContainer">
      <div className={`food_des ${mode}`}>
        <div className="food_card">
          <h2>{recipe.title}</h2>
          <p className={`${mode}`}>{recipe.time} minutes to make</p>
          <div className="recipecook_img">
            <img src={`${recipe.recipeImageUrl}`} alt={`${recipe.title}`} />
          </div>
          {recipe.createdTime.seconds === recipe.lastEditedTime.seconds ? (
            <p className={`${mode}`}>
              Created on{" "}
              {`${
                monthName[recipe.createdTime.toDate().getMonth()]
              } ${recipe.createdTime.toDate().getDate()},${recipe.createdTime
                .toDate()
                .getFullYear()}`}{" "}
              by {displayName}
            </p>
          ) : (
            <p className={`${mode}`}>
              Updated on{" "}
              {`${
                monthName[recipe.lastEditedTime.toDate().getMonth()]
              } ${recipe.lastEditedTime
                .toDate()
                .getDate()},${recipe.lastEditedTime
                .toDate()
                .getFullYear()}`}{" "}
              by {displayName}
            </p>
          )}
          <div className="cookingDescription">
            <h3>Ingredients</h3>
            <div className="cookingDescription-ing">
              <ul style={{ listStylePosition: "inside" }}>
                {recipe.ingredients.map((elements, index) => {
                  return <li key={index}>{elements}</li>;
                })}
              </ul>
            </div>
            <h3>How to make {recipe.title}</h3>
            {textToBulletPoint(recipe.method)}
          </div>
        </div>
        <i onClick={edit} className="fas fa-pen"></i>
      </div>
    </div>
  ) : (
    <DummyContent />
  );
};

export default Recipecook;
