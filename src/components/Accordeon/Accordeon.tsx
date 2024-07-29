import styles from "./accordeon.module.css";

import { AccordeonItem } from "./AccordeonItem/AccordeonItem";

export const Accordeon = () => {
  return (
    <ul className={styles.list}>
      <li>
        <AccordeonItem
          open={true}
          question="How can I track the status of my order?"
          answer='After placing your order, you will receive a confirmation email
          containing your order number and a tracking link. You can also log in
          to your account on our website and go to the "My Orders" section to
          track your delivery status.'
        />
      </li>
      <li>
        <AccordeonItem
          question="What payment methods do you accept?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          provident unde officia quibusdam voluptate nobis quas nisi deserunt at
          temporibus, voluptates culpa illo, soluta ratione doloribus iste esse
          deleniti velit?"
        />
      </li>
      <li>
        <AccordeonItem
          question="How can I return or exchange an item?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ad
          quia facilis molestiae quasi asperiores mollitia illum, odit
          dignissimos atque aperiam minima expedita numquam consequuntur quis
          ipsam, est odio deserunt?"
        />
      </li>
    </ul>
  );
};
