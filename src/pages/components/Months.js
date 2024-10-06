
const Months = ({ month, setMonth }) => {

    return (
        <div className="right_panel">
            <div className={month === 1 ? "active_blue" : "blue"} onClick={() => setMonth(1)}>January</div>
            <div className={month === 2 ? "active_blue" : "blue"} onClick={() => setMonth(2)}>February</div>
            <div className={month === 3 ? "active_blue" : "blue"} onClick={() => setMonth(3)}>March</div>
            <div className={month === 4 ? "active_blue" : "blue"} onClick={() => setMonth(4)}>April</div>
            <div className={month === 5 ? "active_blue" : "blue"} onClick={() => setMonth(5)}>May</div>
            <div className={month === 6 ? "active_blue" : "blue"} onClick={() => setMonth(6)}>June</div>
            <div className={month === 7 ? "active_blue" : "blue"} onClick={() => setMonth(7)}>July</div>
            <div className={month === 8 ? "active_blue" : "blue"} onClick={() => setMonth(8)}>August</div>
            <div className={month === 9 ? "active_blue" : "blue"} onClick={() => setMonth(9)}>September</div>
            <div className={month === 10 ? "active_blue" : "blue"} onClick={() => setMonth(10)}>October</div>
            <div className={month === 11 ? "active_blue" : "blue"} onClick={() => setMonth(11)}>November</div>
            <div className={month === 12 ? "active_blue" : "blue"} onClick={() => setMonth(12)}>December</div>
        </div>
    );
};

export default Months;