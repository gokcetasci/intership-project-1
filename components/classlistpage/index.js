"use client";
import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";
import EditPopUp from "../editpopup";
import ViewStudentList from "../studentlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { RiDeleteBinFill } from "react-icons/ri";

const ClassListPage = ({ onViewStudentListClick, setShowClassButton }) => {
  const { classes, addStudent, deleteStudent, deleteClass } = useStore(); //bu sayfada kullanılacak durum ve fonksiyonları store'dan içeri aldık
  const [currentClass, setCurrentClass] = useState(null);
  const [editClassId, setEditClassId] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    //classes durumu değiştiğinde logla
    console.log(classes);
  }, [classes]);

  // Edit düğmesine tıklandığında çalışacak fonksiyon
  const handleEditClick = (classId) => {
    setShowEditPopUp(true);
    setEditClassId(classId);
  };

  // Öğrenci listesini görüntüle düğmesine tıklandığında çalışacak fonksiyon
  const handleViewStudentList = (classId) => {
    setCurrentClass(classId);
  };

  // Sınıf listesine geri dönmek için kullanılacak fonksiyon
  const handleBackToClassList = () => {
    setCurrentClass(null);
    setShowClassButton(true);
  };

  // Dropdown açma/kapatma
  const handleDropdownToggle = (classId) => {
    setDropdownOpen(dropdownOpen === classId ? null : classId);
  };

  // Dropdown menü için seçim işlemleri
  const handleDropdownSelect = (action, classId) => {
    setDropdownOpen(null);
    if (action === "edit") {
      handleEditClick(classId);
    } else if (action === "view") {
      handleViewStudentList(classId);
    } else if (action === "delete") {
      console.log("Delete button clicked");
      setConfirmDelete(true);
      setEditClassId(classId);
    }
  };

  // Öğrenci listesini görüntüle düğmesine tıklanınca çalışacak fonksiyon
  const handleViewStudentListClick = () => {
    onViewStudentListClick();
  };

  //class silme işleminin gerçekleştiği fonksiyon 
  const handleConfirmDelete = () => {
    deleteClass(editClassId);
    setConfirmDelete(false);
  }

  //class silme işlemini iptal eden fonksiyon
  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div id="classlistpage" className="container mx-auto max-w-[1200px]">
      <div>
        {currentClass ? (
          <ViewStudentList
            classInfo={classes.find(
              (classInfo) => classInfo.id === currentClass
            )}
            onDeleteStudent={(studentId) =>
              deleteStudent(currentClass, studentId)
            }
            onAddStudent={(studentName, studentEmail) =>
              addStudent(currentClass, studentName, studentEmail)
            }
            onBackToClassList={handleBackToClassList}
            setShowClassButton={setShowClassButton}
          />
        ) : (
          <>
            <div id="classlist" className="container mx-auto ">
              <table className="table-auto border-collapse  border-b border-tableborder w-full ">
                <thead >
                  <tr className="text-tablehead text-[8px] sm:text-[10px] md:text-[12px] lg:text-[15px] font-semibold leading-[12px] sm:leading-[21px] ">
                    <th className="border-b border-tableborder p-[4px] sm:p-[10px] text-center w-[20px] sm:w-[100px]" >
                      Resim
                    </th>
                    <th className="border-b border-tableborder p-[4px] sm:p-[10px] text-center">
                      Sınıf
                    </th>
                    <th className="border-b border-tableborder p-[4px] sm:p-[10px] text-center">
                      Sınıf Adı
                    </th>
                    <th className="border-b border-tableborder p-[4px] sm:p-[10px] text-center">
                      Sınıf Şubesi
                    </th>
                    <th className="border-b border-tableborder p-[4px] sm:p-[10px] sm:w-[40px] ">
                      Seçenekler
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="text-tablepcolor text-[6px] sm:text-[10px] lg:text-[14px] leading-[15px] font-normal w-full ">
                  {classes.map((classInfo) => (
                    <tr key={classInfo.id}>
                      <td className="border-b border-tableborder text-center p-4">
                        <PiStudentFill className="ml-2 sm:ml-6 w-2 sm:w-4 h-2 sm:h-4" />
                      </td>
                      <td className="border-b border-tableborder text-center p-4">
                        {classInfo.grade}
                      </td> 
                      <td className="border-b border-tableborder text-center p-4">
                        {classInfo.name}
                      </td>
                      <td className="border-b border-tableborder text-center p-4">
                        {classInfo.section}
                      </td>
                      <td
                        id="dropdownmenu"
                        className="border-b border-tableborder text-tablepcolor"
                      >
                        <div className="relative inline-block flex items-center justify-center" >
                          <div>
                            <button
                              type="button"
                              className="inline-flex text-tablepcolor "
                              onClick={() => handleDropdownToggle(classInfo.id)}
                              
                            >
                              <BsThreeDotsVertical className="fill-tablepcolor w-3 sm:w-5 md:w-[26px] h-3 sm:h-5 md:h-[26px] hover:scale-105 hover:fill-[#8b5cf6]" />
                            </button>
                          </div>

                          {dropdownOpen === classInfo.id && (
                            <div
                              className=" absolute top-5 right-5 mt-2 w-32 sm:w-52 md:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div role="none">
                                <button
                                  className="block p-[3px] sm:p-[10px] flex flex-row items-center text-[8px] sm:text-[12px] md:text-[15px] hover:bg-[#f3f4f6] w-full"
                                  role="menuitem"
                                  onClick={() =>
                                    handleDropdownSelect("edit", classInfo.id)
                                  }
                                >
                                  <FaEdit className="mr-2 w-2 sm:w-4 h-2 sm:h-4" />
                                  Düzenle
                                </button>
                                <button
                                  className="block p-[3px] sm:p-[10px] flex flex-row items-center text-[8px] sm:text-[12px] md:text-[15px] hover:bg-[#f3f4f6] w-full"
                                  onClick={() => {
                                    handleDropdownSelect("view", classInfo.id);
                                    handleViewStudentListClick();
                                  }}
                                >
                                  <FaList className="mr-2 w-2 sm:w-4 h-2 sm:h-4" />
                                  Öğrenci Listesini Görüntüle
                                </button>
                                <button 
                                  className="block p-[3px] sm:p-[10px] flex flex-row items-center text-[8px] sm:text-[12px] md:text-[15px] hover:bg-[#f3f4f6] w-full"
                                  onClick={() => {
                                  handleDropdownSelect("delete", classInfo.id)}}>
                                    <RiDeleteBinFill className="mr-2 w-2 sm:w-4 h-2 sm:h-4" />
                                    Sınıfı Sil
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showEditPopUp && (
          <EditPopUp
            id="editpopup"
            classInfo={classes.find(
              (classInfo) => classInfo.id === editClassId
            )}
            onClose={() => setShowEditPopUp(false)}
          />
        )}
        {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="mb-4 text-lg">
            Bu sınıfı silmek istediğinizden emin misiniz?            </p>
            <div className="flex justify-end">
              <button
                className="mr-3 px-6 py-2 bg-deletebutton text-white rounded flex flex-row items-center justify-center text-white  rounded-full hover:scale-105 cursor-pointer"
                onClick={handleConfirmDelete}
              >
                Sil
              </button>
              <button
                className="px-4 py-2 text-deletebutton hover:scale-105"
                onClick={handleCancelDelete}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ClassListPage;
