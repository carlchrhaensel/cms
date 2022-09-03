<?php

class Statistics
{
    public function __construct(Page $page)
    {
        $pageId = $page->getPageId();

        $stmtDayExists = $page->getDatabase()->getConnection()->prepare("SELECT *
                                                                               FROM stats
                                                                               WHERE date = CURRENT_DATE()
                                                                                 AND page_id = :pageId");
        $stmtDayExists->bindParam(":pageId", $pageId);
        $stmtDayExists->execute();
        if ($stmtDayExists->rowCount() == 0) {
            $stmtInsert = $page->getDatabase()->getConnection()->prepare("INSERT INTO stats (date, page_id, count)
                                                                                VALUES (CURRENT_DATE(), :pageId, 1)");
            $stmtInsert->bindParam(":pageId", $pageId);
            $stmtInsert->execute();
        } else {
            $stmtUpdate = $page->getDatabase()->getConnection()->prepare("UPDATE stats
                                                                                SET count = count + 1
                                                                                WHERE date = CURRENT_DATE()
                                                                                  AND page_id = :pageId");
            $stmtUpdate->bindParam(":pageId", $pageId);
            $stmtUpdate->execute();
        }
    }
}