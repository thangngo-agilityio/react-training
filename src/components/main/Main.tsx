import { Suspense, useCallback, useContext, useState } from "react"
import { ModalContext } from "context/modal"
import AddCard from "@components/common/card/addCard/AddCard"
import { MODAL_TITLE } from "constants/common"
import { defaultData } from "constants/food"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"

function MainPage() {
  const [modalFoodData, setModalFoodData] = useState(defaultData)

  const {
    mutationModal,
    setMutationShowUp
  } = useContext(ModalContext)


  const onClickAdd = useCallback(() => {
    setMutationShowUp(true, MODAL_TITLE.ADD, defaultData)
  }, [setMutationShowUp])

  // const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
  //   e.prevenDefault();

  //   const validateMessage =
  // }, [])

  return (
    <>
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            <AddCard onClick={onClickAdd} />

          </div>
        </section>
      </main>

      {mutationModal.isShowUp && (
        <Suspense fallback={<Spinner />}>
          <MultiModal title={mutationModal.title} productData={modalFoodData} setProductData={setModalFoodData} onSubmit={() => { }} />
        </Suspense>
      )}
    </>
  )
}

export default MainPage
